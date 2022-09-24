const { Kafka } = require("kafkajs");

const kafka = new Kafka({
  clientId: "DSSDTP2",
  brokers: ["127.0.0.1:9092"],
});

const traerMensajes = async (req) => {
  try {
    const timestamp = Date.now();
    //el gropiId con el que se inicializa el consumer debe ser unico para traer todos los mensajes del topic cada vez que se llama al método
    const consumer = kafka.consumer({ groupId: timestamp.toString() });

    await consumer.connect();

    await consumer.subscribe({
      topic: req.topic,
      fromBeginning: true,
    });

    let retorno = [];

    await consumer.run({
      eachMessage: async ({ message }) => {
        const value = message.value.toString();
        retorno.push(JSON.parse(value));
      },
    });

    setTimeout(() => {
      consumer.disconnect();
      console.log(retorno);
      return retorno;
    }, 1000);
  } catch (error) {
    console.log("error en consumer: " + error);
    return {
      status: 500,
      error: error,
    };
  }
};

module.exports = {
  traerMensajes,
};
