// errorHandler.js
const { INTERNAL_SERVER_ERROR } = require("../constants/ErrorConstants");

function errorHandler(err, req, res, next) {
  console.error(err);

  const status = err.status || 500;
  const message = err.message || INTERNAL_SERVER_ERROR;

  return res.status(status).render("error", { status, message });
}

module.exports = errorHandler;
