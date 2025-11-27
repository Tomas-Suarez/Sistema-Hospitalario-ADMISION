const { Model, DataTypes } = require("sequelize");
const sequelize = require("./db");
const Admision = require("./AdmisionModels");
const Enfermero = require("./EnfermeroModels");

class SignosVitales extends Model {}

SignosVitales.init(
  {
    id_signo_vital: {
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
    id_enfermero: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Enfermero,
        key: "id_enfermero",
      },
      onDelete: "CASCADE",
    },
    fecha_registro: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    temperatura: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    presion_arterial: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    frecuencia_cardiaca: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    frecuencia_respiratoria: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    saturacion_oxigeno: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    observaciones: {
      type: DataTypes.STRING,
      allowNull: true,
    }
  },
  {
    sequelize,
    modelName: "SignosVitales",
    tableName: "signos_vitales",
    timestamps: false,
    freezeTableName: true,
  }
);

module.exports = SignosVitales;