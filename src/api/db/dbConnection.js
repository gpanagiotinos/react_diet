import {db_user, db_userMySQL} from '../config/database.js'
import Sequelize from 'sequelize'

let sequelize = null
if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test' ) {
    sequelize = new Sequelize(db_userMySQL.dbname, db_userMySQL.dbusername, db_userMySQL.dbpassword, {
        host: db_userMySQL.dbhost,
        logging: false,
        dialect: 'mysql', 
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
          }
    })
} else {
     sequelize = new Sequelize(process.env.JAWSDB_URL)
}
async function dbConnection () {
    return await sequelize.authenticate
}
export {dbConnection, sequelize}