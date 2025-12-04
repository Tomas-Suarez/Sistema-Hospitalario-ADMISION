const express = require("express");
const router = express.Router();

const EvaluacionController = require("../controllers/EvaluacionController");
const AltaController = require("../controllers/AltaController");

const checkRole = require("../middlewares/authRole");

// Listado de pacientes internados para evaluar
router.get(
  "/pacientes",
  checkRole("Medico"),
  EvaluacionController.getPacientesInternados
);

// Formulario de nueva evaluación/evolución
router.get(
  "/crear/:id_admision",
  checkRole("Medico"),
  EvaluacionController.getFormularioEvaluacion
);

// Guardar nueva evaluación
router.post(
  "/guardar",
  checkRole("Medico"),
  EvaluacionController.createEvaluacion
);

// Ver detalle de una evaluación
router.get(
  "/detalle/:id_evaluacion",
  checkRole("Medico"),
  EvaluacionController.getDetalleEvaluacion
);

// Vista principal para gestionar el alta
router.get(
  "/alta",
  checkRole("Medico"),
  AltaController.getVistaAlta
);

// Buscar paciente para dar de alta
router.get(
  "/alta/buscar",
  checkRole("Medico"),
  AltaController.buscarPacienteParaAlta
);

// Confirmar y procesar el alta
router.post(
  "/alta/confirmar",
  checkRole("Medico"),
  AltaController.procesarAlta
);

router.get(
  "/historial/:id_admision",
  checkRole(["Medico"]), 
  EvaluacionController.getHistorialEvaluaciones
);

module.exports = router;