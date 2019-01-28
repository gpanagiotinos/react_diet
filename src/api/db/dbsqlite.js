import {db_user} from '../config/dbconfig.js'
import Sequelize from 'sequelize'

const sequelize = new Sequelize(db_user.dbname, db_user.dbusername, db_user.dbpassword, {
    host: db_user.dbhost,
    dialect: 'sqlite', 
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      },
      storage: db_user.storage
})

async function dbConnection () {
    return await sequelize.authenticate
}
module.exports = {
    dbConnection: dbConnection,
    sequelize: sequelize
}