import schema from '../schema/schema.js'
import express_graphql from 'express-graphql'
import models from '../models/init.js'
import express from 'express'
const router = express.Router()
import ssr from '../ssr/index.js'
import template from '../ssr/template.js'
router.use('/graphql', express_graphql({
    schema: schema,
    graphiql: true,
    context: {models}
}))
router.get('/', (req, res) => {
    const {content} = ssr({})
    const response = template("SSR", {}, content)
    res.setHeader('Cache-Control', 'assets, max-age=604800')
    res.send(response)
})

module.exports = router