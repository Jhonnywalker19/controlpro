const express = require("express")
const router = express.Router()
const db = require("../database/db")

router.get("/", async (req,res)=>{

let ventas=0
let pedidos=0
let usuarios=0
let productos=0

db.get("SELECT SUM(total) as total FROM ventas",(e,row)=>{
ventas=row?.total || 0
})

db.get("SELECT COUNT(*) as total FROM ventas",(e,row)=>{
pedidos=row?.total || 0
})

db.get("SELECT COUNT(*) as total FROM usuarios",(e,row)=>{
usuarios=row?.total || 0
})

db.get("SELECT COUNT(*) as total FROM productos",(e,row)=>{
productos=row?.total || 0
})

setTimeout(()=>{

res.json({

ventas,
pedidos,
usuarios,
productos,

grafico:{
horas:["8am","10am","12pm","2pm","4pm","6pm","8pm"],
valores:[10,30,25,40,60,50,80]
}

})

},300)

})

module.exports = router