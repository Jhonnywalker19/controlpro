const express = require("express")
const router = express.Router()
const db = require("../database/db")

/* =========================
OBTENER MOVIMIENTOS
========================= */

router.get("/movimientos",(req,res)=>{

console.log("Ruta caja funcionando")

let restaurante_id = 1

let sql = "SELECT * FROM movimientos_caja WHERE restaurante_id = ? ORDER BY fecha DESC"

db.all(sql,[restaurante_id],(err,data)=>{

if(err){
console.log(err)
return res.json([])
}

console.log("Datos encontrados:",data)

res.json(data)

})

})

/* =========================
CREAR MOVIMIENTO
========================= */

router.post("/movimiento",(req,res)=>{

let {
restaurante_id,
usuario,
tipo,
concepto,
entrada,
salida,
metodo_pago
} = req.body

let sql = "INSERT INTO movimientos_caja (restaurante_id,usuario,tipo,concepto,entrada,salida,metodo_pago) VALUES (?,?,?,?,?,?,?)"

db.run(sql,[
restaurante_id,
usuario,
tipo,
concepto,
entrada,
salida,
metodo_pago
])

res.json({ok:true})

})

module.exports = router