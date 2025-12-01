const express = require("express");
const router = express.Router();
const AsignacionDormitorioController = require("../controllers/AsignacionDormitorioController");
const checkRole = require("../middlewares/authRole");

// Mostrar las asignaciones de dormitorio activas (Tablero de Internaciones)
router.get(
  "/GestionInternacion",
  checkRole("Recepcionista"),
  AsignacionDormitorioController.getAsignacionesActuales
);

// Asignar un dormitorio a una admisión pendiente
router.post(
  "/asignar",
  checkRole("Recepcionista"),
  AsignacionDormitorioController.createAsignacionDormitorio
);

// Cambio de habitacion
router.post(
  "/cambiar", 
  checkRole("Recepcionista"), 
  AsignacionDormitorioController.cambiarHabitacion
);

module.exports = router;