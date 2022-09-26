//modulos
const express = require('express');
const path = require('path');
const subastasCallback = require('../callbacks/subastasCallback');

//inicializacion
const router = express();

//rutas
router.post('api/subasta',subastasCallback.save)
module.exports = router