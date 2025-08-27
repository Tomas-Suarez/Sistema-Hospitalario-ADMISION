const { Model, DataTypes } = require("sequelize");
const sequelize = require("./db");

class Rol extends Model {}

Rol.init(
  {
    id_rol: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Rol",
    tableName: "rol",
    freezeTableName: true,
    timestamps: false,
  }
);

module.exports = Rol;
