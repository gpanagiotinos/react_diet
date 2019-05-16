
import sqlite3 from 'sqlite3'

const db = new sqlite3.Database(':memory:')
const db_user = {
    dbname: 'react_diet',
    dbusername: null,
    dbpassword: null,
    dbhost: 'localhost',
    db: db,
    storage: db.filename
  }
  const db_userMySQL = {
    dbname: process.env.DB_NAME,
    dbusername: process.env.DB_USERNAME,
    dbpassword: process.env.DB_PASSWORD,
    dbhost: process.env.DB_HOST
  }
  export {db_user, db_userMySQL}