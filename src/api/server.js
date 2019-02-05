import path from 'path'
import express from 'express'
import bodyParser from 'body-parser'
import {dbConnection} from './db/dbsqlite.js'
import dbSync from './db/syncmodels.js'
import dbFake from './db/fakerdata.js'
import routes from './routes/index.js'

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
app.use('/', routes)
app.get('/george', (req, res) => {
    res.sendFile(HTML_FILE)
})
// app.use('/api/', index)
const PORT = process.env.PORT || 8090

app.listen(PORT, () => {
    console.log(`App listening to ${PORT}`)
    console.log('Press Ctrl+C to quit')
})