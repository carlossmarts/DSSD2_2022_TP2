const { serverError, serverOK } = require('./utils')
const producer = require("../kafka/producer");

const callback = {};


callback.save = (req, res) => {
  try {
    const topic = `productos_${req.body.idProducto}`
    producer.guardarMensaje(req.body, topic);
    res.json(serverOK());
  } catch (error) {
    console.error("ProductosCallbak Save: " + error.message);
    serverError(error);
  }
};
module.exports = callback;
