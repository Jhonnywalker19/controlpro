const express = require("express")
const router = express.Router()
const db = require("../database/db")

/* ========================= */
/* LISTAR CATEGORIAS */
/* ========================= */

router.get("/", (req,res)=>{

const restaurante_id = req.query.restaurante_id

db.all(
"SELECT * FROM categorias WHERE restaurante_id = ?",
[restaurante_id],
(err,rows)=>{

if(err){
console.log(err)
return res.json({error:"Error cargando categorias"})
}

res.json(rows)

})

})

/* ========================= */
/* CREAR CATEGORIA */
/* ========================= */

router.post("/", (req,res)=>{

const {nombre, restaurante_id} = req.body

db.run(
"INSERT INTO categorias (nombre, restaurante_id) VALUES (?,?)",
[nombre, restaurante_id],
function(err){

if(err){
console.log(err)
return res.json({error:"Error creando categoria"})
}

res.json({ok:true})

})

})

module.exports = router