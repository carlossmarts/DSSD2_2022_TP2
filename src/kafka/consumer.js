const { Kafka } = require('kafkajs');
const { restart } = require('nodemon');
const { serverError, serverOK } = require('../callbacks/utils')

const kafka = new Kafka({
  clientId: "DSSDTP2",
  brokers: ["127.0.0.1:9092"],
});

const persistFacturas = async () => {
  try {
    console.log(`se consume el topic <facturas> con el groupId: facturas`);
    const timestamp = Date.now()
    const consumer = kafka.consumer({ groupId: "facturas" })

    await consumer.connect()

    await consumer.subscribe({
      topic: "facturas",
      fromBeginning: true
    })

    let retorno = [];

    await consumer.run({
      eachMessage: async ({ message }) => {
        const value = message.value.toString();
        console.log(`se recupero el mensaje ${value}`)
        /* TODO
            cada vez que llegue una factura se debe guardar en la base de datos
        */
      },
    });

    setTimeout(() => {
      consumer.disconnect()
      return serverOK(retorno)
    }, 5000)

  } catch (error) {
    console.error("error en consumer: " + error)
    return serverError(error)
  }
}

const traerMensajes = async (req, res) => {
    const groupId = req.body.groupId
    const topic = req.body.topic 
    try {
      console.log(`se consume el topic <${topic}> con el groupId: ${groupId}`);
      const consumer = kafka.consumer({ groupId: groupId })
  
      await consumer.connect()
  
      await consumer.subscribe({
        topic: topic,
        fromBeginning: true
      })

    consumer.run({
        eachBatchAutoResolve: false,
        eachBatch: async ({ batch, resolveOffset, heartbeat, isRunning, isStale }) => {
            console.log("mensajes pendientes: " + batch.messages.length )
            let rs = []
            for (let message of batch.messages) {
                if (!isRunning() || isStale()) break
                resolveOffset(message.offset)
                rs.push(JSON.parse(message.value.toString()))
            }
            res.json(rs)
            consumer.disconnect()
        }
    })
    
    } catch (error) {
      console.error("error en consumer: " + error)
      return serverError(error)
    }
  }

module.exports = {
  traerMensajes,
  persistFacturas
};
