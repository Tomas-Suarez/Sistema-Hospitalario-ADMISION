const { Model, DataTypes } = require("sequelize");
const sequelize = require("./db");

class TipoPrueba extends Model {}

TipoPrueba.init(
  {
    id_tipo_prueba: {
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
    modelName: "TipoPrueba",
    tableName: "tipo_prueba",
    freezeTableName: true,
    timestamps: false,
  }
);

module.exports = TipoPrueba;