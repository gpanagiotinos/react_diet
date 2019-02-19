import schema from '../schema/schema.js'
import express_graphql from 'express-graphql'
import models from '../models/init.js'
import express from 'express'
import path from 'path'
const router = express.Router()
import ssr from '../ssr/index.js'
import template from '../ssr/template.js'
import {router as user} from './user.js'

router.use('/assets', express.static(path.resolve(__dirname, '../../../assets')))
router.use('/graphql', express_graphql({
    schema: schema,
    graphiql: true,
    context: {models}
}))
router.use('/user', user)

// ssr request
router.get('/', (req, res) => {
    const {content} = ssr({})
    let response = null
    if (process.env.NODE_ENV === 'development') {
        response = template('Development SSR', {}, content)
    } else {
        response = template("SSR", {}, content)
    }
    res.setHeader('Cache-Control', 'assets, max-age=604800')
    res.send(response)
})

module.exports = router