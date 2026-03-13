const db = require("../database/db")

exports.listar = (req,res)=>{

db.all("SELECT * FROM impresoras",(err,rows)=>{

if(err){
res.json([])
return
}

res.json(rows)

})

}

exports.crear = (req,res)=>{

let nombre = req.body.nombre
let tipo = req.body.tipo
let ip = req.body.ip
let puerto = req.body.puerto
let area = req.body.area

db.run(
"INSERT INTO impresoras(nombre,tipo,ip,puerto,area) VALUES(?,?,?,?,?)",
[nombre,tipo,ip,puerto,area],
function(err){

if(err){
res.json({ok:false})
return
}

res.json({ok:true})

}
)

}