const { Model, DataTypes } = require("sequelize");
const sequelize = require("./db");
const Rol = require("./RolModels");

class Usuario extends Model {}

Usuario.init(
  {
    id_usuario: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_rol: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: Rol,
        key: "id_rol",
      },
      onDelete: "CASCADE",
    },
    nombre_usuario: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password_hash: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Usuario",
    tableName: "usuario",
    timestamps: false,
    freezeTableName: true,
  }
);

module.exports = Usuario;
