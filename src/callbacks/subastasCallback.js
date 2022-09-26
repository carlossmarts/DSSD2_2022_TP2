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
callback.list = (req, res) => {
  try {
    const timestamp = Date.now().toString()
    console.log("Yendo")
    const resp = consumer.traerMensajes(`ofertas_${req.body.idProducto}`, timestamp);
    console.log("No, llegando")
    res.json(resp);
  } catch (error) {
    console.error("SubastasCallbak List: " + error.message);
  }
};
module.exports = callback;
