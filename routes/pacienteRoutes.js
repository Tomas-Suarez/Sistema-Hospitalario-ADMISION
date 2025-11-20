const express = require("express");
const router = express.Router();
const pacienteController = require("../controllers/PacienteController");
const { validarPaciente } = require("../middlewares/pacienteValidator");
const { validationResult } = require("express-validator");

// Crear paciente
router.post(
  "/registro",
  validarPaciente,
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("Pacientes/RegistrarPaciente", {
        errors: errors.array(),
        oldData: req.body,
      });
    }
    next();
  },
  pacienteController.createPaciente
);


// Actualizar paciente
router.put("/actualizar/:id", pacienteController.updatePaciente);

// Mostrar todos los pacientes
router.get("/GestionPaciente", pacienteController.getAllPacientes);

//Permite cargar el form de la parte de registro admision
router.get("/RegistrarAdmision", pacienteController.formAdmision);

//Obtenemos el paciente por su documento(DNI)
router.get("/obtener-paciente", pacienteController.cargarPaciente);

//permite cargar el form de la parte de emergencia
router.get("/internacion-emergencia", pacienteController.formEmergencia);

// Cambiar el estado del paciente
router.patch("/cambiar-estado/:id", pacienteController.changeStatusPaciente);

router.get("/historial/:id_paciente", pacienteController.getHistorial);


module.exports = router;
