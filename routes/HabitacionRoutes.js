const express = require("express");
const router = express.Router();
const habitacionController = require("../controllers/HabitacionController");
const checkRole = require("../middlewares/authRole");

// Mostrar listado de todas las habitaciones y su estado (Camas libres/ocupadas)
router.get(
  "/ListaHabitacion", 
  checkRole(["Recepcionista", "Admin"]), 
  habitacionController.getHabitaciones
);

// API interna: Devuelve habitaciones disponibles filtradas por Ala y Género
// (Utilizada dinámicamente desde el formulario de Admisión)
router.get(
  "/por-ala", 
  checkRole("Recepcionista"), 
  habitacionController.getHabitacionesPorAlaYGenero
);

router.post(
  "/higienizar/:id_cama",
  checkRole(["Recepcionista"]), 
  habitacionController.higienizarCama
);

module.exports = router;