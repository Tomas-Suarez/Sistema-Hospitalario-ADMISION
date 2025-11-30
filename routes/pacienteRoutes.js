const express = require("express");
const router = express.Router();
const { validationResult } = require("express-validator");

const pacienteController = require("../controllers/PacienteController");

const { validarPaciente } = require("../middlewares/pacienteValidator");
const checkRole = require("../middlewares/authRole");

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).render("Paciente/RegistrarPaciente", {
      errors: errors.array(),
      oldData: req.body,
    });
  }
  next();
};

router.get(
  "/GestionPaciente",
  checkRole(["Admin", "Recepcionista", "Medico"]),
  pacienteController.getAllPacientes
);

// Registrar nuevo paciente (Acceso: Admin y Recepción)
router.post(
  "/registro",
  checkRole(["Admin", "Recepcionista"]),
  validarPaciente,
  handleValidationErrors,
  pacienteController.createPaciente
);

// Actualizar paciente (Acceso: Admin y Recepción)
router.put(
  "/actualizar/:id",
  checkRole(["Admin", "Recepcionista"]),
  pacienteController.updatePaciente
);

// Cambiar estado/Baja lógica (Acceso: Admin y Recepción)
router.patch(
  "/cambiar-estado/:id",
  checkRole(["Admin", "Recepcionista"]),
  pacienteController.changeStatusPaciente
);

// Ver historial clínico (Acceso: Admin, Recepción y Médicos)
router.get(
  "/historial/:id_paciente",
  checkRole(["Admin", "Recepcionista", "Medico"]),
  pacienteController.getHistorial
);

// Cargar formulario de registro de admisión
router.get(
  "/RegistrarAdmision",
  checkRole("Recepcionista"),
  pacienteController.formAdmision
);

// Buscar paciente por DNI para admisión
router.get(
  "/obtener-paciente",
  checkRole("Recepcionista"),
  pacienteController.cargarPaciente
);

// Cargar formulario de ingreso por emergencia (NN)
router.get(
  "/internacion-emergencia",
  checkRole("Recepcionista"),
  pacienteController.formEmergencia
);

module.exports = router;