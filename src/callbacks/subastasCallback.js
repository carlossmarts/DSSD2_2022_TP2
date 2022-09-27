const subastasController = require("../controllers/subastasController");
const producer = require("../kafka/producer");
const consumer = require("../kafka/consumer");

const callback = {};


callback.save = (req, res) => {
  try {
    const respController = subastasController.save(req);
    const topic = `ofertas_${req.body.idProducto}`
    producer.guardarMensaje(req.body, topic);
    res.json(respController);
  } catch (error) {
    console.error("SubastasCallbak Save: " + error.message);
  }
};
module.exports = callback;
