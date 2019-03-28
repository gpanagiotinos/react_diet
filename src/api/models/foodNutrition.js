import food from "./food";
import nutrition from "./nutrition";

export default (sequelize, DataTypes) => {
  return sequelize.define('foodNutrition', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    foodId: {
      type: DataTypes.INTEGER,
      references: {
        model: food,
        key: 'id'
      }
    },
    nutritionId: {
      type: DataTypes.INTEGER,
      references: {
        model: nutrition,
        key: 'nutrition_id'
      }
    },
    derivation: {
      type: DataTypes.STRING,
      allowNull: false
    },
    group: {
      type: DataTypes.STRING,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    unit: {
      type: DataTypes.STRING,
      allowNull: false
    },
    value: {
      type: DataTypes.STRING,
      allowNull: false
    },
  })
}