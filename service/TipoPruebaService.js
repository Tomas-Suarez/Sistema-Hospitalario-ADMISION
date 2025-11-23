const TipoPrueba = require("../models/TipoPruebaModels");

const getAllPruebas = async () => {
  try {
    const pruebas = await TipoPrueba.findAll();
    return pruebas;
  } catch (error) {
    throw new Error("Error al obtener los tipos de prueba: " + error.message);
  }
};

module.exports = {
  getAllPruebas,
};