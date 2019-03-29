import {Model, DataTypes} from 'sequelize'
import foodNutrition from './foodNutrition'
export default class FoodNutritionMeasure extends Model {
    static init(sequelize) {
        return super.init({
          id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
          },
          foodNutritionId: {
            type: DataTypes.INTEGER,
            allowNull: false
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
        }, {
            tableName: 'food_nutrition_measure',
            sequelize
        })
    }
}