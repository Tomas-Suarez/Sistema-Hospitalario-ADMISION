const { Model, DataTypes } = require("sequelize");
const sequelize = require("./db");
const Admision = require("./AdmisionModels");
const Enfermero = require("./EnfermeroModels");
const Tratamiento = require("./TratamientoModels");

class RegistroTratamiento extends Model {}

RegistroTratamiento.init(
  {
    id_registro_tratamiento: {
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
    id_tratamiento: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Tratamiento,
        key: "id_tratamiento",
      },
      onDelete: "CASCADE",
    },
    fecha_realizacion: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    observaciones: {
      type: DataTypes.STRING,
      allowNull: true,
    }
  },
  {
    sequelize,
    modelName: "RegistroTratamiento",
    tableName: "registro_tratamiento",
    timestamps: false,
    freezeTableName: true,
  }
);

module.exports = RegistroTratamiento;