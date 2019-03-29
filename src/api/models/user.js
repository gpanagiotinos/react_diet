import {Model, DataTypes} from 'sequelize'
export default class User extends Model {
    static init(sequelize) {
        return super.init({
            user_id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            username: {
                type: DataTypes.STRING,
                allowNull: false
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false
            },
            role: {
                type: DataTypes.INTEGER,
                allowNull: false
            }
        }, {
            tableName: 'user',
            sequelize
        })
    }
}