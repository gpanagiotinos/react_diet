import path from 'path'
import express from 'express'
import bodyParser from 'body-parser'
import {dbConnection} from './db/dbConnection.js'
import {dbSync} from './db/syncmodels.js'
import {dbFake} from './db/fakerdata.js'
import {router as routes} from './routes/index.js'
import session from './config/session.js'
import open from 'open'



// db connection instance
dbConnection().then((message) => {
    console.log('Connection with db established')
    return dbSync()
}).then(() => {
    console.log('Sync functions')
    return dbFake()
})
.then(() => {
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

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`App listening to ${PORT}`)
    if (process.env.NODE_ENV === 'development') {
        open(`http:localhost:${PORT}`)
    }
    console.log('Press Ctrl+C to quit')
})