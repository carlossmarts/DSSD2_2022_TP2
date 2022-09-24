const {Kafka} = require('kafkajs')
const kafka = new Kafka({
    clientId: 'DSSDTP2',
    brokers: ['127.0.0.1:9092']
})

const producer = kafka.producer()

//esta funcion es un callback correspondiente a un endpoint de express
const guardarMensaje = async (req, res)=>{
    console.log(req)
    try {
        //1) Abrir conexion al broker de kafka
        await producer.connect()

        console.log("guardando mensaje en topic: ", req.topic)
        const msg = JSON.stringify(req)

        //2) guardar mensaje en el broker indicando el topic y mensaje
        await producer.send({
            topic: req.topic,
            messages:[
                {
                    value: msg
                }
            ]
        })

        //3) cerrar conexion
        await producer.disconnect()

        //4) Enviar respuesta al frontend
        // res.send("mensaje guardado")
    } catch (error) {
        console.log("error en producer: " + error)
        res.json({
            status: 500,
            error: error
        })
    }
}


module.exports = {
    guardarMensaje
}