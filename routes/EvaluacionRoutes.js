const express = require("express");
const router = express.Router();
const EvaluacionController = require("../controllers/EvaluacionController");
const checkRole = require("../middlewares/authRole");

router.get("/pacientes", checkRole("Medico"), EvaluacionController.getPacientesInternados);

module.exports = router;