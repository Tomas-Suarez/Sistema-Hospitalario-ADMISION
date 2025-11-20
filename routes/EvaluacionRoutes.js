const express = require("express");
const router = express.Router();
const EvaluacionController = require("../controllers/EvaluacionController");
const checkRole = require("../middlewares/authRole");

router.get("/pacientes", checkRole("Medico"), EvaluacionController.getPacientesInternados);

router.get("/crear/:id_admision", checkRole("Medico"), EvaluacionController.getFormularioEvaluacion);

router.post("/guardar", checkRole("Medico"), EvaluacionController.createEvaluacion);

module.exports = router;