import foodNutrition from "./foodNutrition";

export default (sequelize, DataTypes) => {
  return sequelize.define('foodNutritionMeasures', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    foodNutritionId: {
      type: DataTypes.INTEGER,
      references: {
        model: foodNutrition,
        key: 'id'
      }
    },
    label: {
      type: DataTypes.STRING,
      allowNull: false
    },
    eqv: {
      type: DataTypes.STRING,
      allowNull: false
    },
    eunit: {
      type: DataTypes.STRING,
      allowNull: false
    },
    qty: {
      type: DataTypes.STRING,
      allowNull: false
    },
    value: {
      type: DataTypes.STRING,
      allowNull: false
    },
  })
}