const {Kafka} = require('kafkajs')
const { serverError, serverOK } = require ('../callbacks/utils')

const kafka = new Kafka({
    clientId: 'DSSDTP2',
    brokers: ['127.0.0.1:9092']
})

const traerMensajes = async (topic, groupId)=>{
    try {

        const timestamp = Date.now()
        //el gropiId con el que se inicializa el consumer debe ser unico para traer todos los mensajes del topic cada vez que se llama al método
        const consumer = kafka.consumer({groupId: groupId})

        await consumer.connect()
        
        await consumer.subscribe({
            topic: topic, 
            fromBeginning: true
        })

        let retorno = []

        await consumer.run(
            {
                eachMessage: async ({message})=>{
                    const value = message.value.toString()
                    retorno.push(JSON.parse(value))
                }
            },
        )

        setTimeout(()=>{
            consumer.disconnect()
            return serverOK(retorno)
        }, 1000)

    } catch (error) {
        console.log("error en producer: " + error)
        return serverError(error)
    }
}

module.exports = {
    traerMensajes
}
