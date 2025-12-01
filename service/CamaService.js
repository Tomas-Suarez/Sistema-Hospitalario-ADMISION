const Cama = require("../models/CamaModels");
const ResourceNotFoundException = require("../exceptions/ResourceNotFoundException");

//Obtenemos todas las camas
const getAllCamas = async () => {
  try {
    const camas = await Cama.findAll();
    return camas;
  } catch (error) {
    throw new Error(
      "Ocurrio un error al obtener las camas: " + error.message
    );
  }
};

const higienizarCama = async (id_cama) => {
  const cama = await Cama.findByPk(id_cama);

  if (!cama) {
    throw new ResourceNotFoundException("Cama no encontrada con ID: " + id_cama);
  }

  cama.higienizada = true;
  await cama.save();

  return cama;
};

module.exports = {
    getAllCamas,
    higienizarCama
}