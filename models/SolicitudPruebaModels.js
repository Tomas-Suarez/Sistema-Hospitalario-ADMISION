const { Model, DataTypes } = require("sequelize");
const sequelize = require("./db");
const Admision = require("./AdmisionModels");
const Medico = require("./MedicoModels");
const TipoPrueba = require("./TipoPruebaModels");
const EvaluacionMedica = require("./EvaluacionMedicaModels");

class SolicitudPrueba extends Model {}

SolicitudPrueba.init(
  {
    id_solicitud: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
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
    id_medico: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Medico,
        key: "id_medico",
      },
      onDelete: "CASCADE",
    },
    id_evaluacion_medica: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: EvaluacionMedica,
        key: "id_evaluacion_medica",
      },
      onDelete: "CASCADE",
    },
    id_tipo_prueba: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: TipoPrueba,
        key: "id_tipo_prueba",
      },
      onDelete: "CASCADE",
    },
    fecha_solicitud: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: "SolicitudPrueba",
    tableName: "solicitud_prueba",
    freezeTableName: true,
    timestamps: false,
  }
);

module.exports = SolicitudPrueba;