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
app.use(express.static(path.join(__dirname, "public")))

/* ============================
RUTA PRINCIPAL
============================ */

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "login.html"))
})

/* ============================
DATABASE
============================ */

const db = require("./database/db")

/* ============================
ROUTERS
============================ */

console.log("Cargando rutas...")

const authRoutes = require("./routes/auth")
const ventasRoutes = require("./routes/ventas")
const mesasRoutes = require("./routes/mesas")
const productosRoutes = require("./routes/productos")
const impresorasRoutes = require("./routes/impresoras")
const restaurantesRoutes = require("./routes/restaurantes")
const categoriasRoutes = require("./routes/categorias")
const dashboardRoutes = require("./routes/dashboard")
const cajaRoutes = require("./routes/caja")

console.log("Rutas cargadas correctamente")

/* ============================
USAR ROUTERS
============================ */

app.use("/auth", authRoutes)
app.use("/ventas", ventasRoutes)
app.use("/mesas", mesasRoutes)
app.use("/productos", productosRoutes)
app.use("/impresoras", impresorasRoutes)
app.use("/restaurantes", restaurantesRoutes)
app.use("/categorias", categoriasRoutes)
app.use("/dashboard", dashboardRoutes)
app.use("/caja", cajaRoutes)

/* ============================
TEST API
============================ */

app.get("/test", (req, res) => {
  res.json({ mensaje: "Servidor funcionando correctamente" })
})

/* ============================
SERVER
============================ */

const PORT = process.env.PORT || 4000

app.listen(PORT, "0.0.0.0", () => {
  console.log("🚀 Servidor iniciado en puerto " + PORT)
})