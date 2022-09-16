const express = require('express')
const app = express()
app.use(express.json())

app.get('/', (req,res)=>{
    console.log("recibida peticion get al endpoint '/' ")
    res.send("hola mundo!")
})

app.listen(5000, ()=>{
    console.log("server iniciado y escuchando en puerto 5000")
})


