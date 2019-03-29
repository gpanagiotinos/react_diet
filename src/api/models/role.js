import {Model, DataTypes} from 'sequelize'
export default class Role extends Model {
    static init(sequelize) {
        return super.init({
          id: {
              type: DataTypes.INTEGER,
              autoIncrement: true,
              primaryKey: true
          },
          role_id: {
              type: DataTypes.STRING,
              allowNull: false
          },
          role_name: {
              type: DataTypes.STRING,
              allowNull: false
          }
        }, {
            tableName: 'role',
            sequelize
        })
    }
}