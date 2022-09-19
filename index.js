const express = require('express'),
path = require('path'),
mysql = require('mysql'),
myConnection = require('express-myconnection');
const ejemploRoutes = require ('./src/routes/ejemploRoutes')
const subastasRoutes = require ('./src/routes/subastasRoutes')

const app = express()
app.set('port', 5000)

//middlewares
app.use(express.json()) //parsea las solicitudes al servidor
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

app.listen(app.get('port'), ()=>{
    console.log("server iniciado y escuchando en puerto ", app.get('port'))
})


