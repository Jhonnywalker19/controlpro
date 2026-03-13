const express = require("express")
const router = express.Router()

const ventasController =
require("../controllers/ventasController")

const db = require("../database/db")

/* ================================
GUARDAR VENTA FINAL
================================ */

router.post("/venta",
ventasController.guardarVenta)

/* ================================
GUARDAR PEDIDO (POS)
================================ */

router.post("/guardarPedido",
ventasController.guardarPedido)

/* ================================
LISTAR PEDIDOS / VENTAS
(cocina y reportes)
================================ */

router.get("/ventas",
ventasController.listarVentas)

/* ================================
ELIMINAR PEDIDO (COCINA)
================================ */

router.delete("/eliminar/:id",
ventasController.eliminarPedido)

/* ================================
OBTENER PEDIDO DE MESA (POS)
ESTA ES LA RUTA QUE FALTABA
================================ */

router.get("/mesa", async (req,res)=>{

const mesa = req.query.mesa

try{

const [rows] = await db.query(`
SELECT productos 
FROM ventas
WHERE mesa = ?
AND pagado = 0
ORDER BY id DESC
LIMIT 1
`,[mesa])

if(rows.length === 0){
return res.json({productos:[]})
}

res.json({
productos: JSON.parse(rows[0].productos)
})

}catch(error){

console.log(error)

res.status(500).json({
error:"Error consultando mesa"
})

}

})

module.exports = router