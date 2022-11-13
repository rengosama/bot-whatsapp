require('dotenv').config();
const qrcode = require('qrcode-terminal');
const { Client, LocalAuth} = require('whatsapp-web.js');
const express = require('express');
const cors = require('cors');
const app = express();
require("./database/database.js")
const port = process.env.PORT || 3000


const client = new Client({
    authStrategy: new LocalAuth()
});

//checkEnvFile();

client.initialize();

client.on('loading_screen', (percent, message) => {
    console.log('LOADING SCREEN', percent, message);
});

client.on('qr', (qr) => {
    qrcode.generate(qr, {small: true});
    console.log(`Ver QR http://localhost:${port}/qr`)
    socketEvents.sendQR(qr)
});


client.on('ready', () => {
    console.log('Client is ready!');
});


client.on('authenticated', () => {
    console.log('AUTHENTICATED');
});

client.on('auth_failure', msg => {
    // Fired if session restore was unsuccessful
    console.error('AUTHENTICATION FAILURE', msg);
});

client.on('message', async msg => {
    console.log('MESSAGE RECEIVED', msg);

    if (msg.body === '!ping reply') {
        // Send a new message as a reply to the current one
        msg.reply('pong');

    }else if (msg.body.startsWith('!sendto ')) {
        // Direct send a new message to specific id
        let number = msg.body.split(' ')[1];
        let messageIndex = msg.body.indexOf(number) + number.length;
        let message = msg.body.slice(messageIndex, msg.body.length);
        number = number.includes('@c.us') ? number : `${number}@c.us`;
        let chat = await msg.getChat();
        chat.sendSeen();
        client.sendMessage(number, message);

    }

});
app.use(cors())
app.use(express.json())
const server = require('http').Server(app)
app.use('/', require('./routes/web'))

server.listen(port, () => {
    console.log(`El server esta listo por el puerto ${port}`);
})