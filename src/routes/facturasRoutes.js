//modulos
const express = require('express');
const path = require('path');
const facturasCallback = require('../callbacks/facturasCallback')

//inicializacion
const router = express();

//rutas
router.post('/api/facturacion/generarFactura',facturasCallback.save)
router.get('api/facturas/get', facturasCallback.get)

module.exports = router