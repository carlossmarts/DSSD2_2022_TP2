const subastasController = require("../controllers/subastasController");
const producer = require("../kafka/producer");
const consumer = require("../kafka/consumer");
const callback = {};
callback.save = (req, res) => {
  try {
    const respController = subastasController.save(req);
    const kafkaMsg = {
      ...req.body,
      topic: `ofertas_${req.body.idProducto}`,
    };
    producer.guardarMensaje(kafkaMsg, res);
    res.json(respController);
  } catch (error) {
    console.error("SubastasCallbak: " + error.message);
  }
};
module.exports = callback;
