const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const path = require("path")

const app = express()

/* ============================
MIDDLEWARE
============================ */

app.use(cors())
app.use(bodyParser.json())

/* servir archivos public */
app.use(express.static(path.join(__dirname, "public")))

/* ============================
RUTA PRINCIPAL
============================ */

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "login.html"))
})

/* ============================
RUTA TEST
============================ */

app.get("/test", (req, res) => {
  res.json({ mensaje: "Servidor funcionando correctamente 🚀" })
})

/* ============================
DATABASE
============================ */

require("./database/db")

/* ============================
ROUTERS
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