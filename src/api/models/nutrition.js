import Sequelize from 'sequelize'
export default class Nutrition extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
          id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
          },
          nutrition_id: {
            type: Sequelize.STRING,
            allowNull: true
          },
          nutrition_name: {
            type: Sequelize.STRING,
            allowNull: false
          }
        }, {
            tableName: 'nutrition',
            sequelize
        })
    }
}