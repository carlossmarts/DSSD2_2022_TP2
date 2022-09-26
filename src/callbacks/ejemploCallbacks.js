const producer = require("../kafka/producer");
const consumer = require("../kafka/consumer");
const { serverError } = require("./utils");
const facturasController = require('../controllers/facturasController')
const callback = {};

callback.produce = (req, res) => {
  try {
    console.log(req.body.msg)
    const response = producer.guardarMensaje(req.body.msg, req.body.topic);
    res.json(response);
  } catch (error) {
    console.error("SubastasCallbak: " + error.message);
    res.json(serverError(error))
  }
};

callback.consume = ((req, res)=>{

    const timestamp = Date.now().toString()
    /*el gropiId con el que se inicializa el consumer debe ser unico para traer 
    todos los mensajes del topic cada vez que se llama al método */
    const data = consumer.traerMensajes(req.body.topic, timestamp)
    res.json(data)
})

module.exports = callback;
