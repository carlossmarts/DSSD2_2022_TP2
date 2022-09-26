const controller = {}

controller.save = (factura) =>{
    req.getConnection((err, conn) => {
        conn.query(
            "INSERT INTO facturas set ?",
            factura,
            (err, factura) => {
                if (err) {
                    console.error("Error insertando factura" + err.message);
                    return connection.rollback(() => {
                        throw err;
                    });
                }
                return factura
            }
        )
    })
}

controller.getByComprador = (idComprador) =>{
    req.getConnection((err, con)=>{
        conn.query('SELECT * FROM facturas WHERE idComprador = ?', [idComprador],
        (err, facturas)=>{
            if (err) {
                console.error("Error consultando subasta" + err.message);
                return;
            }
            return facturas
        })
    })
}
    
module.exports = controller