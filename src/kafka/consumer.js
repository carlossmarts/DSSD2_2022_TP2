const { Kafka } = require('kafkajs')
const { serverError, serverOK } = require('../callbacks/utils')

const kafka = new Kafka({
  clientId: "DSSDTP2",
  brokers: ["127.0.0.1:9092"],
});

const traerMensajes = async (topic, groupId) => {
  try {
    console.log(`se consume el topic <${topic}> con el groupId: ${groupId}`);
    const timestamp = Date.now()
    const consumer = kafka.consumer({ groupId: groupId })

    await consumer.connect()

    await consumer.subscribe({
      topic: topic,
      fromBeginning: true
    })

    let retorno = [];

    await consumer.run({
      eachMessage: async ({ message }) => {
        const value = message.value.toString();
        retorno.push(JSON.parse(value));
      },
    });

    setTimeout(() => {
      consumer.disconnect()
      console.log("Esto es un retorno");
      return serverOK(retorno)
    }, 5000)

  } catch (error) {
    console.error("error en consumer: " + error)
    return serverError(error)
  }
}

module.exports = {
  traerMensajes,
};
