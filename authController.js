const db = require("../database/db")

/* =========================
LOGIN RESTAURANTE
========================= */

exports.login = (req,res)=>{

const {usuario,password} = req.body

if(!usuario || !password){
return res.json({
ok:false,
error:"Ingrese usuario y contraseña"
})
}

db.get(
"SELECT * FROM restaurantes WHERE usuario=? AND password=?",
[usuario,password],
(err,row)=>{

if(err){

console.log("Error login:",err)

return res.json({
ok:false,
error:"Error del servidor"
})

}

if(!row){

return res.json({
ok:false,
error:"Usuario o contraseña incorrectos"
})

}

/* =========================
VERIFICAR ESTADO
========================= */

if(row.estado !== "activo"){

return res.json({
ok:false,
error:"Cuenta desactivada"
})

}

/* =========================
VERIFICAR LICENCIA
========================= */

const hoy = new Date()
const vencimiento = new Date(row.fecha_vencimiento)

if(hoy > vencimiento){

return res.json({
ok:false,
error:"Licencia vencida, contacte al administrador"
})

}

/* =========================
LOGIN CORRECTO
========================= */

res.json({
ok:true,
rol:"admin",
restaurante_id:row.id,
restaurante_nombre:row.nombre
})

})

}