const { serverOK, serverError } = require("../callbacks/utils");

const controller = {}

controller.save = (req) => {
    const facturaReq = {
        fechaCompra: req.body.fechaCompra,
        idComprador: req.body.idComprador,
        totalFacturado: req.body.totalFacturado
    };
    req.getConnection((err, conn) => {
        conn.query(
            "INSERT INTO facturas set ?",
            facturaReq,
            (err, facturaReq) => {
                if (err) {
                    console.error("Error insertando factura" + err.message);
                    return conn.rollback(() => {
                        serverError(err);
                        throw err;
                    });
                }
                req.body.productos.forEach(detalle => {
                    const detalle_factura = {
                        idFactura: facturaReq.insertId,
                        idVendedor: facturaReq.idVendedor,
                        nombre: detalle.nombre,
                        precio: detalle.precio,
                        cantidad: detalle.cantidad
                    };
                    conn.query(
                        "INSERT INTO facturas detalle_factura ?",
                        detalle_factura,
                        (err, facturaReq) => {
                            if (err) {
                                console.error("Error insertando detalle_factura" + err.message);
                                return conn.rollback(() => {
                                    serverError(err);
                                    throw err;
                                });
                            }
                            return serverOK(factura);
                        })
                });
            }
        )
    })
}

controller.getByComprador = (req) => {
    req.getConnection((err, con) => {
        conn.query(`SELECT f.idFactura, f.fechaCompra, f.totalFacturado, df.nombre, df.precio, df.cantidad FROM facturas f
        LEFT JOIN detalle_factura df ON f.idFactura = df.idFactura
        WHERE f.idComprador = ? `, [req.body.idComprador],
            (err, facturas) => {
                if (err) {
                    console.error("Error consultando factura" + err.message);
                    return;
                }
                return facturas
            })
    })
}

module.exports = controller