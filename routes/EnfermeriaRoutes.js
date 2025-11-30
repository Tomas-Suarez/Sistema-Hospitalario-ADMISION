const express = require("express");
const router = express.Router();
const enfermeroController = require("../controllers/EnfermeroController");
const checkRole = require("../middlewares/authRole");

// Muestra la vista principal para buscar un paciente y registrar su evaluación inicial
router.get(
  "/historia",
  checkRole("Enfermero"),
  enfermeroController.getVistaHistoria
);

// Busca un paciente por DNI para cargar o editar sus antecedentes y alergias
router.get(
  "/historia/buscar",
  checkRole("Enfermero"),
  enfermeroController.buscarPacienteHistoria
);

// Guarda los cambios en la historia clínica (alergias, antecedentes) del paciente
router.post(
  "/historia/guardar",
  checkRole("Enfermero"),
  enfermeroController.guardarHistoria
);

// Muestra el tablero con todos los pacientes actualmente internados
router.get(
  "/pacientes",
  checkRole("Enfermero"),
  enfermeroController.getPacientesInternados
);

// Carga la vista para ver el historial y registrar nuevos signos vitales de una internación
router.get(
  "/signos/:id_admision",
  checkRole("Enfermero"),
  enfermeroController.getVistaSignos
);

// Procesa y guarda un nuevo registro de medición de signos vitales (temperatura, presión, etc.)
router.post(
  "/signos/guardar",
  checkRole("Enfermero"),
  enfermeroController.createSignosVitales
);

// Muestra el detalle completo de una medición específica histórica
router.get(
  "/signos/detalle/:id_signo",
  checkRole("Enfermero"),
  enfermeroController.getDetalleSignos
);

// Muestra el "Plan de Cuidados": lista de tratamientos activos que el médico indicó para el paciente
router.get(
  "/cuidados/activos/:id_admision",
  checkRole("Enfermero"),
  enfermeroController.getVistaCuidadosActivos
);

// Muestra el historial de todas las aplicaciones de medicamentos o cuidados ya realizados
router.get(
  "/cuidados/historial/:id_admision",
  checkRole("Enfermero"),
  enfermeroController.getVistaHistorialCuidados
);

// Registra la ejecución de un cuidado (ej: "Se administró antibiótico a las 14hs")
router.post(
  "/cuidados/guardar",
  checkRole("Enfermero"),
  enfermeroController.registrarCuidado
);

module.exports = router;
