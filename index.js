const express = require('express')
const path = require('path')
const ejemploRoutes = require ('./src/routes/ejemploRoutes')

const app = express()
app.set('port', 5000)

//middlewares
app.use(express.json()) //parsea las solicitudes al servidor

const logger = (req, res, next)=>{
    console.log(`Peticion ${req.method.toUpperCase()} recibida -  ${req.protocol}://${req.get('host')}${req.originalUrl}`)
    console.log("body: ", req.body)
    next();
}
//Rutas
app.use(logger)
app.use(ejemploRoutes)

app.listen(app.get('port'), ()=>{
    console.log("server iniciado y escuchando en puerto ", app.get('port'))
})


