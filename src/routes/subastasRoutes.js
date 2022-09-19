//modulos
const express = require('express');
const path = require('path');
const { appendFile } = require('fs');
const subastasCallback = require('../callbacks/subastasCallback');

//inicializacion
const router = express();

//rutas
router.post('/subasta',subastasCallback.save)
module.exports = router