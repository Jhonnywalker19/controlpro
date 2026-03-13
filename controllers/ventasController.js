const db = require("../database/db")

/* MOTOR DE IMPRESION */

const imprimirPedido = require("../printer/printerManager")

/* =========================
GUARDAR VENTA (API ANTIGUA)
========================= */

exports.guardarVenta = (req,res)=>{

let fecha = new Date().toLocaleString()
let total = req.body.total
let detalle = JSON.stringify(req.body.detalle)
let restaurante_id = req.body.restaurante_id

db.run(
"INSERT INTO ventas (fecha,total,detalle,restaurante_id) VALUES (?,?,?,?)",
[fecha,total,detalle,restaurante_id],
function(err){

if(err){
return res.json({error:err})
}

res.json({ok:true})

})

}

/* =========================
LISTAR VENTAS / PEDIDOS
========================= */

exports.listarVentas = (req,res)=>{

const restaurante_id = req.query.restaurante_id

if(!restaurante_id){
return res.json([])
}

db.all(
"SELECT * FROM ventas WHERE restaurante_id=? ORDER BY id DESC",
[restaurante_id],
(err,rows)=>{

if(err){
console.log(err)
return res.json([])
}

res.json(rows)

})

}

/* =========================
GUARDAR PEDIDO DESDE POS
========================= */

exports.guardarPedido = (req,res)=>{

const {usuario,mesa,productos,total,restaurante_id} = req.body

let fecha = new Date().toLocaleString()

const detalle = JSON.stringify(productos)

db.run(
"INSERT INTO ventas (fecha,total,detalle,usuario,mesa,restaurante_id) VALUES (?,?,?,?,?,?)",
[fecha,total,detalle,usuario,mesa,restaurante_id],
function(err){

if(err){

console.log(err)
return res.status(500).json({error:"error guardando venta"})

}

/* =========================
IMPRIMIR PEDIDO
========================= */

imprimirPedido({

mesa: mesa,
productos: productos,
total: total

})

res.json({ok:true})

})

}

/* =========================
ELIMINAR PEDIDO (COCINA)
========================= */

exports.eliminarPedido = (req,res)=>{

const id = req.params.id

db.run(
"DELETE FROM ventas WHERE id=?",
[id],
function(err){

if(err){
console.log(err)
return res.json({ok:false})
}

res.json({ok:true})

})

}