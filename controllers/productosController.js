const db = require("../database/db")

/* =========================
LISTAR PRODUCTOS
========================= */

exports.listar = (req,res)=>{

const restaurante_id = req.query.restaurante_id

db.all(
"SELECT * FROM productos WHERE restaurante_id=?",
[restaurante_id],
(err,rows)=>{

if(err){
return res.json([])
}

res.json(rows)

})

}

/* =========================
CREAR PRODUCTO
========================= */

exports.crear = (req,res)=>{

const {nombre,categoria,imagen,tamanos,restaurante_id} = req.body

db.run(
"INSERT INTO productos(nombre,categoria,imagen,tamanos,restaurante_id) VALUES(?,?,?,?,?)",
[nombre,categoria,imagen,tamanos,restaurante_id],
function(err){

if(err){
return res.json({ok:false})
}

res.json({ok:true})

})

}