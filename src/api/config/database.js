
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
  export {db_user}