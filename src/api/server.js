import path from 'path'
import express from 'express'
import express_graphql from 'express-graphql'
import {buildSchema} from 'graphql'
import bodyParser from 'body-parser'

import {dbConnection} from './db/dbsqlite.js'
import dbSync from './db/fakerdata.js'
// import index from 'routes'
// config graphql
const schema = buildSchema(`
    type Query {
        message: String
    }
`)
var root = {
    message: () => 'Hello World!'
}


// db connection instance
dbConnection().then((message) => {
    console.log('Connection with db established')
    return dbSync()
}).then(() => {
    console.log('Sync functions')
}).catch((error) => {
    console.log('Database Connection failed:' + error)
})
// config express app
const app = express(),
DIST_DIR = __dirname,
HTML_FILE = path.join(DIST_DIR, 'index.html')

app.use(bodyParser.json())
app.use(express.static(DIST_DIR))

app.get('/', (req, res) => {
    res.sendFile(HTML_FILE)
})
app.use('/graphql', express_graphql({
    schema: schema,
    rootValue: root,
    graphiql: true
}))
// app.use('/api/', index)
const PORT = process.env.PORT || 8090

app.listen(PORT, () => {
    console.log(`App listening to ${PORT}`)
    console.log('Press Ctrl+C to quit')
})