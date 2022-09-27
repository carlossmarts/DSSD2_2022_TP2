//modulos
const express = require('express');
const path = require('path');
const ejemploCallbacks = require('../callbacks/ejemploCallbacks')
const consumer = require('../kafka/consumer')


//inicializacion
const router = express();

//rutas
router.get('/', (req, res)=>{
    res.send("hello world!")
})

router.post('/ejemploProductor', ejemploCallbacks.produce);

//router.get('/ejemploConsumidor', ejemploCallbacks.consume);

router.get('/ejemploConsumidor', consumer.traerMensajes)



module.exports = router