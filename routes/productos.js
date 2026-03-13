const express = require("express")
const router = express.Router()
const db = require("../database/db")
const multer = require("multer")
const fs = require("fs")

/* ========================= */
/* LIMPIAR NOMBRE ARCHIVO */
/* ========================= */

function limpiarNombre(nombre){

nombre = nombre.toLowerCase()

// quitar acentos
nombre = nombre.normalize("NFD").replace(/[\u0300-\u036f]/g,"")

// espacios a _
nombre = nombre.replace(/\s+/g,"_")

// quitar caracteres raros
nombre = nombre.replace(/[^\w\-\.]/g,"")

return nombre

}

/* ========================= */
/* CONFIGURAR MULTER */
/* ========================= */

const storage = multer.diskStorage({

destination:function(req,file,cb){

cb(null,"public/imagenes")

},

filename:function(req,file,cb){

let nombreOriginal = limpiarNombre(file.originalname)

let archivo = Date.now() + "-" + nombreOriginal

cb(null,archivo)

}

})

const upload = multer({storage:storage})

/* ========================= */
/* LISTAR PRODUCTOS */
/* ========================= */

router.get("/",(req,res)=>{

const restaurante_id = req.query.restaurante_id

if(!restaurante_id){

return res.json({
error:"restaurante_id requerido"
})

}

db.all(

"SELECT * FROM productos WHERE restaurante_id=?",

[restaurante_id],

(err,rows)=>{

if(err){

console.log("Error productos:",err)

return res.json([])

}

let lista = rows.map(p=>({

id:p.id,
nombre:p.nombre,
categoria:p.categoria,
imagen:p.imagen,
tamanos: JSON.parse(p.tamanos || "[]")

}))

res.json(lista)

})

})

/* ========================= */
/* CREAR PRODUCTO */
/* ========================= */

router.post("/",upload.single("imagen"),(req,res)=>{

let nombre = req.body.nombre
let categoria = req.body.categoria
let tamanos = req.body.tamanos
let restaurante_id = req.body.restaurante_id

let imagen=""

if(req.file){
imagen=req.file.filename
}

if(!nombre || !restaurante_id){

return res.json({
ok:false,
error:"Datos incompletos"
})

}

if(typeof tamanos !== "string"){
tamanos = JSON.stringify(tamanos || [])
}

db.run(

"INSERT INTO productos(nombre,categoria,imagen,tamanos,restaurante_id) VALUES(?,?,?,?,?)",

[
nombre,
categoria,
imagen,
tamanos,
restaurante_id
],

function(err){

if(err){

console.log("Error crear producto:",err)

return res.json({
ok:false,
error:"Error al guardar producto"
})

}

res.json({
ok:true,
id:this.lastID
})

})

})

/* ========================= */
/* ELIMINAR PRODUCTO */
/* ========================= */

router.delete("/:id",(req,res)=>{

let id = req.params.id

db.get("SELECT imagen FROM productos WHERE id=?",[id],(err,row)=>{

if(row && row.imagen){

let ruta="public/imagenes/"+row.imagen

if(fs.existsSync(ruta)){
fs.unlinkSync(ruta)
}

}

db.run(

"DELETE FROM productos WHERE id=?",

[id],

function(err){

if(err){

console.log(err)

return res.json({ok:false})

}

res.json({ok:true})

})

})

})

module.exports = router