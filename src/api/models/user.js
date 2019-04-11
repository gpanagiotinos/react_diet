import {Model, DataTypes} from 'sequelize'
import bcrypt from 'bcrypt'
import { rejects } from 'assert';
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
                }
            },
            sequelize
        })
    }
    static async validateUsernamePassword (username, password) {
        try {
            const userFind = await this.findOne({where: {username: username}})
            if (userFind) {
                const passwordCompare = await bcrypt.compare(password, userFind.password)
                if (passwordCompare) {
                    return Promise.resolve(userFind)
                }
            }
            return null
        } catch (error) {
            return Promise.rejects(error)
        }
    }
}