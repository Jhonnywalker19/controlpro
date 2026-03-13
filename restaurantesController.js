const db = require("../database/db")

/* =========================
LISTAR RESTAURANTES
========================= */

exports.listar = (req,res)=>{

db.all("SELECT * FROM restaurantes ORDER BY id DESC",(err,rows)=>{

if(err){
return res.json([])
}

res.json(rows)

})

}

/* =========================
CREAR RESTAURANTE
========================= */

exports.crear = (req,res)=>{

const {nombre,usuario,password} = req.body

let fecha_inicio = new Date().toISOString().split("T")[0]

let vencimiento = new Date()
vencimiento.setMonth(vencimiento.getMonth()+1)

let fecha_vencimiento = vencimiento.toISOString().split("T")[0]

db.run(
"INSERT INTO restaurantes(nombre,usuario,password,fecha_inicio,fecha_vencimiento,estado) VALUES(?,?,?,?,?,?)",
[nombre,usuario,password,fecha_inicio,fecha_vencimiento,"activo"],
function(err){

if(err){
return res.json({error:"Error creando restaurante"})
}

res.json({ok:true})

})

}

/* =========================
ESTADISTICAS PANEL ADMIN
========================= */

exports.estadisticas = (req,res)=>{

db.get(
`SELECT 
COUNT(*) as total_restaurantes,
SUM(CASE WHEN estado='activo' THEN 1 ELSE 0 END) as activos,
SUM(CASE WHEN estado='desactivo' THEN 1 ELSE 0 END) as vencidos
FROM restaurantes`,
(err,restaurantes)=>{

if(err){
return res.json({error:err})
}

db.get(
"SELECT SUM(total) as ventas_totales FROM ventas",
(err2,ventas)=>{

if(err2){
return res.json({error:err2})
}

res.json({
restaurantes,
ventas
})

})

})

}