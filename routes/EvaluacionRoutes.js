const express = require("express");
const router = express.Router();
const EvaluacionController = require("../controllers/EvaluacionController");
const checkRole = require("../middlewares/authRole");
const AltaController = require("../controllers/AltaController");

router.get("/pacientes", checkRole("Medico"), EvaluacionController.getPacientesInternados);

router.get("/crear/:id_admision", checkRole("Medico"), EvaluacionController.getFormularioEvaluacion);

router.post("/guardar", checkRole("Medico"), EvaluacionController.createEvaluacion);

router.get("/detalle/:id_evaluacion", checkRole("Medico"), EvaluacionController.getDetalleEvaluacion);

router.get("/alta", checkRole("Medico"), AltaController.getVistaAlta);

router.get("/alta/buscar", checkRole("Medico"), AltaController.buscarPacienteParaAlta);

router.post("/alta/confirmar", checkRole("Medico"), AltaController.procesarAlta);

module.exports = router;