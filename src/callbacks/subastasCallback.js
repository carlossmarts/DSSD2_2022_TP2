const subastasController = require('../controllers/subastasController');
const producer = require('../kafka/producerEjemplo')
const consumer = require('../kafka/consumerEjemplo');
const callback = {};
callback.save = (req, res) => {
    try{
        const respController =subastasController.save(req);
        producer.guardarMensaje(req,res);
        res.json(respController);
    }catch(error){
        console.error("SubastasCallbak: "+error.message);
    }

  };
module.exports = callback;