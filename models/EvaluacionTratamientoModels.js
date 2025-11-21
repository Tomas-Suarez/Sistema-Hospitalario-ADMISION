const { Model, DataTypes } = require("sequelize");
const sequelize = require("./db");
const EvaluacionMedica = require("./EvaluacionMedicaModels");
const Tratamiento = require("./TratamientoModels");

class EvaluacionTratamiento extends Model {}

EvaluacionTratamiento.init(
  {
    id_evaluacion_tratamiento: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
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
    id_tratamiento: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Tratamiento,
        key: "id_tratamiento",
      },
      onDelete: "CASCADE",
    },
  },
  {
    sequelize,
    modelName: "EvaluacionTratamiento",
    tableName: "evaluacion_tratamiento",
    timestamps: false,
    freezeTableName: true,
    indexes: [
      {
        unique: true,
        name: "eval_trat_unique",
        fields: ["id_evaluacion_medica", "id_tratamiento"],
      },
    ],
  }
);

module.exports = EvaluacionTratamiento;