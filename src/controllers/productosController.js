//modulos
const express = require('express');
const path = require('path');
const { appendFile } = require('fs');
const productosCallback = require('../callbacks/productosCallback');

//inicializacion
const router = express();

//rutas
router.post('/producto',productosCallback.save)
router.get('/producto/getHistorico', productosCallback.list);
module.exports = router