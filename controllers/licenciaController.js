const db = require("../database/db")

exports.verificar = (req,res)=>{

const usuario = req.params.usuario

db.get(

"SELECT * FROM restaurantes WHERE usuario=?",
[usuario],

(err,row)=>{

if(err){
return res.json({activo:false})
}

if(!row){
return res.json({activo:false})
}

let hoy = new Date()
let vencimiento = new Date(row.fecha_vencimiento)

if(hoy > vencimiento){

return res.json({
activo:false
})

}

return res.json({
activo:true
})

})

}