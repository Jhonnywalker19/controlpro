const express = require("express")
const router = express.Router()

const mesasController = require("../controllers/mesasController")

/* LISTAR MESAS */

router.get("/mesas",mesasController.listarMesas)

/* CREAR MESA */

router.post("/crearMesa",mesasController.crearMesa)

/* ABRIR MESA */

router.post("/abrirMesa",mesasController.abrirMesa)

/* CERRAR MESA */

router.post("/cerrarMesa",mesasController.cerrarMesa)

/* ELIMINAR MESA */

router.post("/eliminarMesa",mesasController.eliminarMesa)

module.exports = router