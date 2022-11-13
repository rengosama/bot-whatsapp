const mongoose = require('mongoose')

/*try{
    mongoose.connect(process.env.URI_MONGO).
    catch(error => handleError(error));
    console.log('conectado a BD 👍👍👍')
}catch(error){
    console.log('error en la conexion ❌❌❌')
}*/

mongoose.connect(process.env.URI_MONGO).then(
    () => { /** ready to use. The `mongoose.connect()` promise resolves to mongoose instance. */console.log('conectado a BD 👍👍👍') },
    err => { /** handle initial connection error */console.log('error en la conexion ❌❌❌') }
  );