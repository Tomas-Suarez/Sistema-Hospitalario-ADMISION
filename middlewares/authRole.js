const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

function checkRole(requiredRole) {
  return (req, res, next) => {
    try {
      const token = req.cookies.jwt || req.headers.authorization?.split(" ")[1];
      if (!token) return res.status(401).redirect("/usuarios/login");

      const decoded = jwt.verify(token, JWT_SECRET);
      if (decoded.rol !== requiredRole) {
        return res.status(403).send("No tienes permiso para acceder a esta página");
      }

      req.user = decoded;
      next();
    } catch (err) {
      return res.status(401).redirect("/usuarios/login");
    }
  };
}

module.exports = checkRole;
