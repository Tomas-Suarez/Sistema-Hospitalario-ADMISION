const { Model, DataTypes } = require("sequelize");
const sequelize = require("./db");

class Alergia extends Model {}

Alergia.init(
  {
    id_alergia: {
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
    modelName: "Alergia",
    tableName: "alergia",
    timestamps: false,
    freezeTableName: true,
  }
);

module.exports = Alergia;
