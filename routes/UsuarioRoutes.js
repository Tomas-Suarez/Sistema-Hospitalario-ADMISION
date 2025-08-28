const express = require("express");
const router = express.Router();
const UsuarioController = require("../controllers/UsuarioController");
const checkRole = require("../middlewares/authRole");

router.get("/registro", checkRole("Admin"), UsuarioController.getRegistroUsuario);

router.post("/registro", checkRole("Admin"), UsuarioController.createUsuario);

router.get("/login", UsuarioController.getLogin);

router.post("/login", UsuarioController.loginUsuario);

router.get("/logout", (req, res) => {
  res.clearCookie("jwt");
  res.redirect("/usuarios/login");
});

module.exports = router;
