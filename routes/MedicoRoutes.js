const express = require("express");
const router = express.Router();
const { validationResult } = require("express-validator");

// Controller
const medicoController = require("../controllers/MedicoController");

// Middlewares
const { validarMedico } = require("../middlewares/medicoValidator");
const checkRole = require("../middlewares/authRole");

// Middleware auxiliar para manejar errores de validación
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).render("Medicos/RegistrarMedico", {
      errors: errors.array(),
      oldData: req.body,
    });
  }
  next();
};

// Mostrar lista de médicos
router.get(
  "/GestionMedico",
  checkRole("Admin"),
  medicoController.getAllMedico
);

// Registrar un nuevo médico
router.post(
  "/registro",
  checkRole("Admin"),
  validarMedico,
  handleValidationErrors,
  medicoController.createMedico
);

// Actualizar datos de un médico
router.put(
  "/actualizar",
  checkRole("Admin"),
  medicoController.updateMedico
);

// Cambiar el estado (Alta/Baja) de un médico
router.patch(
  "/cambiar-estado",
  checkRole("Admin"),
  medicoController.changeStatusMedico
);

module.exports = router;