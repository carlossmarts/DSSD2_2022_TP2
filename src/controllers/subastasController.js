const controller = {};
controller.save = (req) => {
    const data = req.body;
    console.log(req.body)
    req.getConnection((err, connection) => {
      const query = connection.query('INSERT INTO subastas set ?', data, (err, subasta) => {
        if (err) {
            callback(err);
            console.error("Error insertando subasta"+err.message);
            return
          }
        return {
            "statusCode":200,
            "msg":"ok"
        }
      })
    })
  };
module.exports = controller;
