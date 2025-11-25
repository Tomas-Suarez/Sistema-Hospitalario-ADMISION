const { Model, DataTypes } = require("sequelize");
const sequelize = require("./db");

class Antecedente extends Model {}

Antecedente.init(
  {
    id_antecedente: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize,
    modelName: "Antecedente",
    tableName: "antecedente",
    freezeTableName: true,
    timestamps: false,
  }
);

module.exports = Antecedente;