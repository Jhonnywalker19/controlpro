const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
const path = require("path")

const app = express()

/* ============================
MIDDLEWARE
============================ */

app.use(cors())
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, "public")))

/* ============================
DATABASE
============================ */

require("./database/db")

/* ============================
RUTAS
============================ */

console.log("Cargando rutas...")

app.use("/auth", require("./routes/auth"))
app.use("/ventas", require("./routes/ventas"))
app.use("/mesas", require("./routes/mesas"))
app.use("/productos", require("./routes/productos"))
app.use("/impresoras", require("./routes/impresoras"))
app.use("/restaurantes", require("./routes/restaurantes"))
app.use("/categorias", require("./routes/categorias"))
app.use("/dashboard", require("./routes/dashboard"))
app.use("/caja", require("./routes/caja"))

console.log("Rutas cargadas correctamente")

/* ============================
RUTA PRINCIPAL
============================ */

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "login.html"))
})

/* ============================
TEST
============================ */

app.get("/test", (req, res) => {
  res.json({
    status: "ok",
    mensaje: "Servidor funcionando"
  })
})

/* ============================
SERVER
============================ */

const PORT = process.env.PORT || 8080

app.listen(PORT, "0.0.0.0", () => {

  console.log("🚀 Servidor iniciado en puerto", PORT)

})