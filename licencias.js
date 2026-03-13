const express = require("express")
const router = express.Router()

const licenciaController = require("../controllers/licenciaController")

router.get("/verificarLicencia/:usuario", licenciaController.verificar)

module.exports = router