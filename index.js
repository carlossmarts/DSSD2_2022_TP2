const express = require('express')
path = require('path')
mysql = require('mysql')
const cron = require('node-cron');

myConnection = require('express-myconnection');
const productosRoutes = require ('./src/routes/productosRoutes');
const subastasRoutes = require ('./src/routes/subastasRoutes')
const facturasRoutes = require('./src/routes/facturasRoutes')
const ejemploRoutes = require('./src/routes/ejemploRoutes')
const { persist } = require('./src/callbacks/facturasCallback');

const app = express()
app.set('port', 5000)

//middlewares
app.use(express.json())

app.use(myConnection(mysql, {
	host: 'bclnro5zyhtbtwvryre1-mysql.services.clever-cloud.com',
	user: 'ukxw0rjfbjdb9cfu',
	password: 'CWZb3YYjm9MpSPeKXjXY',
	port: 3306,
	database: 'bclnro5zyhtbtwvryre1'
}, 'single'));

app.use(express.urlencoded({extended: false}));
const logger = (req, res, next)=>{
	console.log(`Peticion ${req.method.toUpperCase()} recibida -  ${req.protocol}://${req.get('host')}${req.originalUrl}`)
	console.log("body: ", req.body)
	next();
}


//Rutas
app.use(logger)
app.use(ejemploRoutes)
app.use(subastasRoutes)
// app.use(productosRoutes)
app.use(facturasRoutes)

//cada minuto lee el topic de facturas y las guadra en bd
cron.schedule("*/1 * * * *", persist)

app.listen(app.get('port'), ()=>{
	console.log("server iniciado y escuchando en puerto ", app.get('port'))
})


