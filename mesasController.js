const db = require("../database/db")

/* LISTAR MESAS */

exports.listarMesas = (req,res)=>{

db.all("SELECT * FROM mesas",(err,rows)=>{

if(err){
res.json([])
return
}

res.json(rows)

})

}

/* CREAR MESA */

exports.crearMesa = (req,res)=>{

let nombre = req.body.nombre

db.run(
"INSERT INTO mesas(nombre) VALUES(?)",
[nombre],
function(err){

if(err){
res.json({error:err})
return
}

res.json({ok:true})

})

}

/* ABRIR MESA */

exports.abrirMesa = (req,res)=>{

let id = req.body.id
let hora = new Date().toISOString()

db.run(
"UPDATE mesas SET estado='ocupada',hora_inicio=? WHERE id=?",
[hora,id],
function(err){

if(err){
res.json({error:err})
return
}

res.json({ok:true})

})

}

/* CERRAR MESA */

exports.cerrarMesa = (req,res)=>{

let id = req.body.id

db.run(
"UPDATE mesas SET estado='libre',hora_inicio=NULL WHERE id=?",
[id],
function(err){

if(err){
res.json({error:err})
return
}

res.json({ok:true})

})

}

/* ELIMINAR MESA */

exports.eliminarMesa = (req,res)=>{

let id = req.body.id

db.run(
"DELETE FROM mesas WHERE id=?",
[id],
function(err){

if(err){
res.json({error:err})
return
}

res.json({ok:true})

})

}