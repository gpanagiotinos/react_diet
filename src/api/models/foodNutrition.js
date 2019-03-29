import {Model, DataTypes} from 'sequelize'
export default class FoodNutrition extends Model {
    static init(sequelize) {
        return super.init({
          id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
          },
          foodId: {
            type: DataTypes.INTEGER,
            allowNull: false
          },
          nutritionId: {
            type: DataTypes.INTEGER,
            allowNull: false
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
        }, {
            tableName: 'food_nutrition',
            sequelize
        })
    }
}