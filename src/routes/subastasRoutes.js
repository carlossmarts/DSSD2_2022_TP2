//modulos
const express = require('express');
const path = require('path');
const subastasCallback = require('../callbacks/subastasCallback');
const consumer = require('../kafka/consumer')

//inicializacion
const router = express();

//rutas
router.post('/api/subasta',subastasCallback.save);
router.get('/api/subasta/getHistorico', consumer.traerMensajes);

module.exports = router