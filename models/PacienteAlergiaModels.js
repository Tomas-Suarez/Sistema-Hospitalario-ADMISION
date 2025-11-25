const { Model, DataTypes } = require("sequelize");
const sequelize = require("./db");
const Paciente = require("./PacienteModels");
const Alergia = require("./AlergiaModels");

class PacienteAlergia extends Model {}

PacienteAlergia.init(
  {
    id_paciente_alergia: {
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
    id_alergia: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Alergia,
        key: "id_alergia",
      },
      onDelete: "CASCADE",
    },
  },
  {
    sequelize,
    modelName: "PacienteAlergia",
    tableName: "paciente_alergia",
    freezeTableName: true,
    timestamps: false,
  }
);

module.exports = PacienteAlergia;
