const Alergia = require("../models/AlergiaModels");
const AlergiaMapper = require("../mappers/AlergiaMapper");

const getAllAlergia = async () => {
  try {
    const alergias = await Alergia.findAll();
    return alergias.map(alergia => AlergiaMapper.toDto(alergia));
  } catch (error) {
    throw new Error(
      "Ocurrio un error al obtener las alergias: " + error.message
    );
  }
};

module.exports = {
    getAllAlergia,
}