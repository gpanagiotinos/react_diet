import {Model, DataTypes} from 'sequelize'
import bcrypt from 'bcrypt'
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
        },
        {
            tableName: 'user',
            hooks: {
                beforeCreate: async(user, options) => {
                    const hashPassword = await bcrypt.hash(user.password, 10)
                    user.password = hashPassword
                    console.log(user.password)
                }
            },
            sequelize
        })
    }
    static validatePassword (password) {
        console.log(password, this)
    }
}