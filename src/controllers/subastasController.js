const controller = {};
controller.save = (req, res) => {
    const data = req.body;
    console.log(req.body)
    req.getConnection((err, connection) => {
      const query = connection.query('INSERT INTO subastas set ?', data, (err, subasta) => {
        console.log(subasta)
        res.json({
            "statusCode":200,
            "msg":"ok"
        });
      })
    })
  };
module.exports = controller;
