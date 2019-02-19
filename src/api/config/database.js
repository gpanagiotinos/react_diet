import path from 'path'
import sqlite3 from 'sqlite3'

const dbPath = path.resolve(__dirname, '../dbsqlite/react_diet.sqlite')
const db = new sqlite3.Database(dbPath)
const db_user = {
    dbname: 'react_diet',
    dbusername: null,
    dbpassword: null,
    dbhost: 'localhost',
    db: db,
    storage: db.filename
  }
  module.exports = {
    db_user: db_user
  }