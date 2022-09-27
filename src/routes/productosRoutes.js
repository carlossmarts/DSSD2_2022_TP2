//modulos
const express = require('express');
const path = require('path');
const consumer = require('../kafka/consumer')
const productosCallback = require('../callbacks/productosCallback');

//inicializacion
const router = express();

//rutas
router.post('/api/producto',productosCallback.save);
router.get('/api/producto/getHistorico', consumer.traerMensajes);

module.exports = router