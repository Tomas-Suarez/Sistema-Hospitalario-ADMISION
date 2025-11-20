const { Model, DataTypes } = require("sequelize");
const sequelize = require("./db");
const Guardia = require("./GuardiaModels");
const Usuario = require("./UsuarioModels");

class Enfermero extends Model {}

Enfermero.init(
  {
    id_enfermero: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_usuario: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      references: {
        model: Usuario,
        key: "id_usuario",
      },
      onDelete: "CASCADE",
    },
    id_guardia: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Guardia,
        key: "id_guardia",
      },
      onDelete: "CASCADE",
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    apellido: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    genero: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    documento: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    matricula: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    estado: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Enfermero",
    tableName: "enfermero",
    freezeTableName: true,
    timestamps: false,
  }
);

module.exports = Enfermero;
