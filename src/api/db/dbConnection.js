import {db_user, db_userMySQL} from '../config/database.js'
import Sequelize from 'sequelize'

// const sequelize = new Sequelize(db_user.dbname, db_user.dbusername, db_user.dbpassword, {
//     host: db_user.dbhost,
//     logging: false,
//     dialect: 'sqlite', 
//     pool: {
//         max: 5,
//         min: 0,
//         acquire: 30000,
//         idle: 10000
//       },
//       storage: db_user.storage
// })
const sequelize = new Sequelize(db_userMySQL.dbname, db_userMySQL.dbusername, db_userMySQL.dbpassword, {
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

async function dbConnection () {
    return await sequelize.authenticate
}
export {dbConnection, sequelize}