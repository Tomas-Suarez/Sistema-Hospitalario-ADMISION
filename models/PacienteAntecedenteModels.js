const { Model, DataTypes } = require("sequelize");
const sequelize = require("./db");
const Paciente = require("./PacienteModels");
const Antecedente = require("./AntecedenteModels");

class PacienteAntecedente extends Model {}

PacienteAntecedente.init(
  {
    id_paciente_antecedente: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_paciente: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Paciente,
        key: "id_paciente",
      },
      onDelete: "CASCADE",
    },
    id_antecedente: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Antecedente,
        key: "id_antecedente",
      },
      onDelete: "CASCADE",
    },
  },
  {
    sequelize,
    modelName: "PacienteAntecedente",
    tableName: "paciente_antecedente",
    freezeTableName: true,
    timestamps: false,
  }
);

module.exports = PacienteAntecedente;