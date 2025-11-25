const Antecedente = require("../models/AntecedenteModels");
const AntecedenteMapper = require("../mappers/AntecedenteMapper");

const getAllAntecedente = async () => {
  try {
    const Antecedentes = await Antecedente.findAll();
    return Antecedentes.map(alergia => AntecedenteMapper.toDto(alergia));
  } catch (error) {
    throw new Error(
      "Ocurrio un error al obtener los antecedentes: " + error.message
    );
  }
};

module.exports = {
    getAllAntecedente,
}