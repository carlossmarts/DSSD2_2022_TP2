const controller = {};
controller.save = (req) => {
  const data = req.body;
  req.getConnection((err, conn) => {
    conn.query(
      "SELECT idSubasta from productos where idProducto = ?",
      [data.idProducto],
      (err, rows) => {
        if (err) {
          console.error("Error consultando subasta" + err.message);
          return;
        }
        const idSubasta = rows[0].idSubasta;
        const subastaData = {
          fechaPuja: data.fechaPuja,
          idComprador: data.idComprador,
          precioOfrecido: data.precioOfrecido,
        };
        if (idSubasta == null) {
          conn.query(
            "INSERT INTO subastas set ?",
            subastaData,
            (err, subasta) => {
              if (err) {
                console.error("Error insertando subasta" + err.message);
                return connection.rollback(() => {
                  throw err;
                });
              }
              conn.query(
                "UPDATE productos set idSubasta = ? where idProducto = ?",
                [subasta.insertId, data.idProducto],
                (err, rows) => {
                  if (err) {
                    console.error("Error actualizando producto" + err.message);
                    return connection.rollback(() => {
                      throw err;
                    });
                  }
                  return {
                    statusCode: 200,
                    msg: "ok",
                  };
                }
              );
            }
          );
        } else {
          conn.query(
            "UPDATE subastas set ? where idSubasta = ?",
            [subastaData, idSubasta],
            (err, rows) => {
              if (err) {
                console.error("Error actualizando subasta" + err.message);
                return connection.rollback(() => {
                  throw err;
                });
              }
              return {
                statusCode: 200,
                msg: "ok",
              };
            }
          );
        }
      }
    );
  });
};
module.exports = controller;
