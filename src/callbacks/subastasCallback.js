const subastasController = require("../controllers/subastasController");
const producer = require("../kafka/producer");
const consumer = require("../kafka/consumer");

const callback = {};


callback.save = (req, res) => {
  try {
    const respController = subastasController.save(req);
    // const kafkaMsg = {
    //   ...req.body,
    //   topic: `ofertas_${req.body.idProducto}`,
    // };
    const topic = `ofertas_${req.body.idProducto}`
    producer.guardarMensaje(req.body, topic);
    res.json(respController);
  } catch (error) {
    console.error("SubastasCallbak Save: " + error.message);
  }
};
callback.list = (req, res) => {
  try {
    const resp = consumer.traerMensajes({ topic: `ofertas_${req.body.idProducto}`});
    console.log(resp);
    res.json(resp);
  } catch (error) {
    console.error("SubastasCallbak List: " + error.message);
  }
};
module.exports = callback;
