const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

function setUserRole(req, res, next) {
  const token = req.cookies.jwt;
  if (token) {
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      res.locals.userRole = decoded.rol;
      res.locals.userName = decoded.nombre_usuario;
    } catch (err) {
      res.locals.userRole = null;
    }
  } else {
    res.locals.userRole = null;
  }
  next();
}

module.exports = setUserRole;