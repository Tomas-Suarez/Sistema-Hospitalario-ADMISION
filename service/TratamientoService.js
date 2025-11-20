const Tratamiento = require("../models/TratamientoModels");

const getAllTratamientos = async () => {
  try {
    const tratamientos = await Tratamiento.findAll();
    return tratamientos;
  } catch (error) {
    throw new Error("Error al obtener los tratamientos: " + error.message);
  }
};

module.exports = {
  getAllTratamientos,
};