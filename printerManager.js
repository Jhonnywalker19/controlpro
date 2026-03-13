const db = require("../database/db")

const imprimirNetwork = require("./printer")

async function imprimirPedido(pedido){

db.all("SELECT * FROM impresoras",(err,impresoras)=>{

if(err){

console.log("Error cargando impresoras")

return

}

impresoras.forEach(i=>{

if(i.tipo === "red"){

imprimirNetwork({

ip:i.ip,
puerto:i.puerto,
mesa:pedido.mesa,
productos:pedido.productos,
total:pedido.total

})

}

if(i.tipo === "usb"){

console.log("Impresora USB detectada")

}

if(i.tipo === "bluetooth"){

console.log("Impresora Bluetooth detectada")

}

})

})

}

module.exports = imprimirPedido