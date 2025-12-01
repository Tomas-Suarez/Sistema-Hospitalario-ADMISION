const express = require("express");
const router = express.Router();
const { validationResult } = require("express-validator");

const AdmisionController = require("../controllers/AdmisionController");
const EmergenciaController = require("../controllers/EmergenciaController");

const { validarAdmision } = require("../middlewares/admisionValidator");
const checkRole = require("../middlewares/authRole");

// Middleware auxiliar para manejar errores de validación
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).render("Admision/RegistrarAdmision", {
      errors: errors.array(),
      oldData: req.body,
    });
  }
  next();
};

// Obtener las admisiones pendientes
router.get(
  "/InternacionPaciente",
  checkRole("Recepcionista"),
  AdmisionController.getAllAdmisiones
);

// Crear una nueva admisión
router.post(
  "/registrar",
  checkRole("Recepcionista"),
  validarAdmision,
  handleValidationErrors,
  AdmisionController.createAdmision
);

// Crear una admisión de emergencia y asignar habitación automáticamente
router.post(
  "/registrarEmergencia",
  checkRole("Recepcionista"),
  EmergenciaController.registrarYAsignarEmergencia
);

// Cancelar una admisión (Baja lógica)
router.patch(
  "/cancelarAdmision/:id",
  checkRole("Recepcionista"),
  AdmisionController.darDeBajaAdmision
);

// Identificar a un paciente NN en una admisión existente
router.post(
  "/identificar",
  checkRole("Recepcionista"),
  AdmisionController.identificarPaciente
);

module.exports = router;