const producer = require("../kafka/producer");
const consumer = require("../kafka/consumer");
const { serverError } = require("./utils");
const facturasController = require('../controllers/facturasController')
const callback = {};

callback.save = (req, res) => {
  try {
    const response = producer.guardarMensaje(req.body, "facturas");
    res.json(response);
  } catch (error) {
    console.error("SubastasCallbak: " + error.message);
    res.json(serverError(error))
  }
};

//no se llama desde una ruta sino desde un proceso automático
callback.persist = () => {
    console.log("consume el topic <facturas> y las persiste en bd")
    const facturas = consumer.traerMensajes("facturas", "batchProcess")
    facturas.array.forEach(factura => {
        facturasController.save(factura)
    });
}

callback.get((req, res)=>{
    const facturas = facturasController.getByComprador(req.body.idComprador)
    res.json(facturas)
})

module.exports = callback;
