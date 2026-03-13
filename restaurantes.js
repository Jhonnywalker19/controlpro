const express = require("express")
const router = express.Router()

const restaurantesController = require("../controllers/restaurantesController")

/* RESTAURANTES */

router.get("/restaurantes", restaurantesController.listar)

router.post("/crearRestaurante", restaurantesController.crear)

/* ESTADISTICAS DEL SISTEMA */

router.get("/estadisticas", restaurantesController.estadisticas)

module.exports = router