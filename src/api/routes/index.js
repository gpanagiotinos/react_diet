import {schema} from '../schema/schema.js'
import express_graphql from 'express-graphql'
import {dbModel} from '../models/init.js'
import express from 'express'
import path from 'path'
import {validateSession} from '../helpers/session.helpers.js'
import {render} from '../../ssr/index.js'
import {template} from '../../ssr/template.js'
const router = express.Router()
import {router as user} from './user.js'


router.use('/assets', express.static(path.resolve(__dirname, '../../../assets')))
router.use('/graphql', express_graphql({
    schema: schema,
    graphiql: true,
    context: {dbModel}
}))
router.use('/user', user)

// ssr request
router.get('*', (req, res) => {
    validateSession(req).then((user) => {
        console.log('user', user)
        const {content} = render({loggedIn: true, user: user}, {}, req)
        let response = null
        if (process.env.NODE_ENV === 'development') {
            response = template('Development SSR', {loggedIn: true, user: user}, content)
        } else {
            response = template("SSR", {}, content)
        }
        res.setHeader('Cache-Control', 'assets, max-age=604800')
        res.send(response)
    }).catch((error) => {
        const {content} = render({}, {}, req)
        let response = null
        if (process.env.NODE_ENV === 'development') {
            response = template('Development SSR', {loggedIn: false, user: null}, content)
        } else {
            response = template("SSR", {}, content)
        }
        res.setHeader('Cache-Control', 'assets, max-age=604800')
        res.send(response)
    })
})

export {router}