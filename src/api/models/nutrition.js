import Sequelize from 'sequelize'
export default class Nutrition extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
          id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
          },
          nutrient_id: {
            type: Sequelize.STRING,
            allowNull: true
          },
          nutrient_name: {
            type: Sequelize.STRING,
            allowNull: false
          }
        }, {
            tableName: 'nutrition',
            sequelize
        })
    }
}