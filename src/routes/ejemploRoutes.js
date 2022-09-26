//modulos
const express = require('express');
const path = require('path');
const producer = require('../kafka/producerEjemplo')
const consumer = require('../kafka/consumerEjemplo');


//inicializacion
const router = express();

//rutas
router.get('/', (req, res)=>{
    res.send("hello world!")
})

router.post('/ejemploProductor', producer.guardarMensaje);

//router.get('/ejemploConsumidor', consumer.traerMensajes);

module.exports = router