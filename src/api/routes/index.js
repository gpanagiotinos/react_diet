import schema from '../schema/schema.js'
import express_graphql from 'express-graphql'
import models from '../models/init.js'
import express from 'express'
const router = express.Router()

router.use('/graphql', express_graphql({
    schema: schema,
    graphiql: true,
    context: {models}
}))

module.exports = router