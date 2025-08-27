const express = require("express");
const router = express.Router();
const UsuarioController = require("../controllers/UsuarioController");

router.get("/registro", UsuarioController.getRegistroUsuario);

router.post("/registro", UsuarioController.createUsuario);

module.exports = router;
