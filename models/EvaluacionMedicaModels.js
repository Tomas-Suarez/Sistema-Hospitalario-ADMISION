const { Model, DataTypes } = require("sequelize");
const sequelize = require("./db");
const Medico = require("./MedicoModels");
const Admision = require("./AdmisionModels");

class EvaluacionMedica extends Model {}

EvaluacionMedica.init(
  {
    id_evaluacion_medica: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_medico: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Medico,
        key: "id_medico",
      },
      onDelete: "CASCADE",
    },
    id_admision: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Admision,
        key: "id_admision",
      },
      onDelete: "CASCADE",
    },
    observaciones: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    fecha: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  },
  {
    sequelize,
    modelName: "EvaluacionMedica",
    tableName: "evaluacion_medica",
    timestamps: false,
    freezeTableName: true,
  }
);

module.exports = EvaluacionMedica;