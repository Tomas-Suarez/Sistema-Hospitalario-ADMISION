const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
const ForbiddenException = require("../exceptions/ForbiddenException");
const {
  PERMISOS_NECESARIOS_INVALIDOS,
} = require("../constants/ErrorConstants");

function checkRole(requiredRoles) {
  return (req, res, next) => {
    try {
      const token = req.cookies.jwt || req.headers.authorization?.split(" ")[1];
      if (!token){ 
        return res.status(401).redirect("/usuarios/login");
      }
      const decoded = jwt.verify(token, JWT_SECRET);
      const rolesArray = Array.isArray(requiredRoles) ? requiredRoles : [requiredRoles];

      if (!rolesArray.includes(decoded.rol)) {
        throw new ForbiddenException(PERMISOS_NECESARIOS_INVALIDOS);
      }

      req.user = decoded;
      next();
    } catch (error) {
      next(error);
    }
  };
}

module.exports = checkRole;
