//modulos
const express = require('express');
const path = require('path');
const { appendFile } = require('fs');
const subastasController = require('../controllers/subastasController');

//inicializacion
const router = express();

//rutas
router.post('/subasta',subastasController.save)
module.exports = router