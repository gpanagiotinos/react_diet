
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
    dbname: 'react_test_db',
    dbusername: 'georgepan',
    dbpassword: 'george',
    dbhost: 'localhost'
  }
  export {db_user, db_userMySQL}