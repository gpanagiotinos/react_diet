import fs from 'fs'
import path from 'path'
import { importSchema } from 'graphql-import'
import {resolvers} from './resolvers.js'
import {makeExecutableSchema} from 'graphql-tools'

// const schemaFile = path.join(__dirname, 'schemaFile.graphql')
// const typeDefs = fs.readFileSync(schemaFile, 'utf8')
const typeDefs = importSchema('./src/api/schema/schemaFile.graphql')
const schema = makeExecutableSchema({typeDefs, resolvers})

export{schema}