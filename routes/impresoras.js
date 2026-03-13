const express = require("express")
const router = express.Router()

const impresorasController = require("../controllers/impresorasController")

router.get("/impresoras", impresorasController.listar)

router.post("/impresoras", impresorasController.crear)

module.exports = router