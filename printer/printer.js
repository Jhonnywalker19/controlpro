const escpos = require("escpos")

escpos.Network = require("escpos-network")

function imprimirTicket(pedido){

try{

const device = new escpos.Network(pedido.ip, pedido.puerto || 9100)

const printer = new escpos.Printer(device)

device.open(function(){

printer
.align("CT")
.style("B")
.size(1,1)
.text("CONTROLPRO POS")

printer.text("------------------------------")

printer.align("LT")

printer.text("Mesa: " + pedido.mesa)

printer.text(" ")

pedido.productos.forEach(p=>{

printer.text(p.nombre + "   $" + p.precio)

if(p.sabor){

printer.text("   Sabor: " + p.sabor)

}

if(p.obs){

printer.text("   Obs: " + p.obs)

}

})

printer.text(" ")

printer.text("------------------------------")

printer.align("RT")

printer.style("B")

printer.text("TOTAL: $" + pedido.total)

printer.align("CT")

printer.text(new Date().toLocaleString())

printer.cut()

printer.close()

})

}catch(err){

console.log("Error imprimiendo ticket")

}

}

module.exports = imprimirTicket