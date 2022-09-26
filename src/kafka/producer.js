const {Kafka} = require('kafkajs')
const { serverError, serverOK } = require('../callbacks/utils')
const kafka = new Kafka({
    clientId: 'DSSDTP2',
    brokers: ['127.0.0.1:9092']
})

const producer = kafka.producer()

//esta funcion es un callback correspondiente a un endpoint de express
const guardarMensaje = async (msg, topic)=>{
    console.log(`se guarda en topic <${topic}> el mensaje: ${msg}`)
    try {
        //1) Abrir conexion al broker de kafka
        await producer.connect()
        const strMsg = JSON.stringify(msg)

        //2) guardar mensaje en el broker indicando el topic y mensaje
        await producer.send({
            topic: topic,
            messages:[
                {
                    value: strMsg
                }
            ]
        })

        //3) cerrar conexion
        await producer.disconnect()

        return serverOK("")

        //4) Enviar respuesta al frontend
        // res.send("mensaje guardado")
    } catch (error) {
        console.log("error en producer: " + error)
        return serverError(error)
    }
}


module.exports = {
    guardarMensaje
}