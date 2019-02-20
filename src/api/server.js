import path from 'path'
import express from 'express'
import bodyParser from 'body-parser'
import {dbConnection} from './db/dbsqlite.js'
import dbSync from './db/syncmodels.js'
import dbFake from './db/fakerdata.js'
import {router as routes} from './routes/index.js'
import session from './config/session.js'

// db connection instance
dbConnection().then((message) => {
    console.log('Connection with db established')
    return dbSync()
}).then(() => {
    return dbFake()
    console.log('Sync functions')
}).then(() => {
    console.log('Add fake data')
}).catch((error) => {
    console.log('Database Connection failed:' + error)
})
// config express app
const app = express(),
DIST_DIR = __dirname,
HTML_FILE = path.join(DIST_DIR, 'index.html')

app.use(bodyParser.json())
app.use(express.static(DIST_DIR))
app.use(session)
app.use('/', routes)


const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log(`App listening to ${PORT}`)
    console.log('Press Ctrl+C to quit')
})