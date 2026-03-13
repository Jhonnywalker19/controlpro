const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")

const app = express()

/* ============================
MIDDLEWARE
============================ */

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

/* ============================
RUTA DE PRUEBA
============================ */

app.get("/", (req, res) => {
  res.send("ControlPro servidor activo")
})

app.get("/api", (req, res) => {
  res.json({
    status: "ok",
    message: "API funcionando"
  })
})

/* ============================
SERVER
============================ */

const PORT = process.env.PORT || 8080

app.listen(PORT, "0.0.0.0", () => {
  console.log("Servidor iniciado en puerto:", PORT)
})