const express = require("express");
const router = express.Router();
const enfermeroController = require("../controllers/EnfermeroController");
const { validarEnfermero } = require("../middlewares/enfermeroValidator");
const { validationResult } = require("express-validator");
const checkRole = require("../middlewares/authRole");

router.get("/GestionEnfermero", enfermeroController.getAllEnfermero);

router.post(
  "/registro",
  validarEnfermero,
  (req, res, next) => {
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
      return res.status(400).render("Enfermeros/RegistrarEnfermero", {
        errors: errors.array(),
        oldData: req.body,
      });
    }
    next();
  },
  enfermeroController.createEnfermero
);

router.put("/actualizar", enfermeroController.updateEnfermero);

router.patch("/cambiar-estado", enfermeroController.changeStatusEnfermero);

router.get(
  "/historia",
  checkRole("Enfermero"),
  enfermeroController.getVistaHistoria
);

router.get(
  "/historia/buscar",
  checkRole("Enfermero"),
  enfermeroController.buscarPacienteHistoria
);

router.post(
  "/historia/guardar",
  checkRole("Enfermero"),
  enfermeroController.guardarHistoria
);

router.get(
  "/pacientes",
  checkRole("Enfermero"),
  enfermeroController.getPacientesInternados
);

router.get(
  "/signos/:id_admision",
  checkRole("Enfermero"),
  enfermeroController.getVistaSignos
);

router.post(
  "/signos/guardar",
  checkRole("Enfermero"),
  enfermeroController.createSignosVitales
);

router.get(
  "/signos/detalle/:id_signo",
  checkRole("Enfermero"),
  enfermeroController.getDetalleSignos
);

router.get(
  "/cuidados/activos/:id_admision",
  checkRole("Enfermero"),
  enfermeroController.getVistaCuidadosActivos
);
router.get(
  "/cuidados/historial/:id_admision",
  checkRole("Enfermero"),
  enfermeroController.getVistaHistorialCuidados
);
router.post(
  "/cuidados/guardar",
  checkRole("Enfermero"),
  enfermeroController.registrarCuidado
);

module.exports = router;
