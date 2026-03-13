const sqlite3 = require("sqlite3").verbose()
const path = require("path")

/* ===============================
RUTA ABSOLUTA BASE DE DATOS
=============================== */

const dbPath = path.join(__dirname, "..", "controlpro.db")

console.log("📁 Usando base de datos en:", dbPath)

/* ===============================
CONEXIÓN BASE DE DATOS
=============================== */

const db = new sqlite3.Database(dbPath,(err)=>{

if(err){
console.log("❌ Error conectando a la base de datos")
console.log(err)
}else{
console.log("✅ Base de datos conectada correctamente")
}

})

/* ===================================
TABLA IMPRESORAS
=================================== */

db.run(`
CREATE TABLE IF NOT EXISTS impresoras(
id INTEGER PRIMARY KEY AUTOINCREMENT,
nombre TEXT,
tipo TEXT,
ip TEXT,
puerto TEXT,
area TEXT
)
`)

/* ===================================
TABLA RESTAURANTES
=================================== */

db.run(`
CREATE TABLE IF NOT EXISTS restaurantes(
id INTEGER PRIMARY KEY AUTOINCREMENT,
nombre TEXT,
usuario TEXT UNIQUE,
password TEXT,
fecha_inicio TEXT,
fecha_vencimiento TEXT,
estado TEXT
)
`)

/* ===================================
TABLA USUARIOS
=================================== */

db.run(`
CREATE TABLE IF NOT EXISTS usuarios(
id INTEGER PRIMARY KEY AUTOINCREMENT,
nombre TEXT,
usuario TEXT,
password TEXT,
rol TEXT,
restaurante_id INTEGER
)
`)

/* ===================================
TABLA MOVIMIENTOS CAJA
=================================== */

db.run(`
CREATE TABLE IF NOT EXISTS movimientos_caja(
id INTEGER PRIMARY KEY AUTOINCREMENT,
restaurante_id INTEGER,
usuario TEXT,
tipo TEXT,
concepto TEXT,
entrada REAL DEFAULT 0,
salida REAL DEFAULT 0,
metodo_pago TEXT,
fecha DATETIME DEFAULT CURRENT_TIMESTAMP
)
`)

module.exports = db