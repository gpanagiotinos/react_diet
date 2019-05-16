import {schema} from '../schema/schema.js'
import express_graphql from 'express-graphql'
import {dbModel} from '../models/init.js'
import express from 'express'
import path from 'path'
import {validateSession} from '../helpers/session.helpers.js'
import {graphQLAuthentication} from '../helpers/auth.helpers.js'
import {render} from '../ssr/index.js'
import {template} from '../ssr/template.js'
const router = express.Router()
import {router as user} from './user.js'
import {router as diet} from './diet.js'
if (process.env.NODE_ENV === 'development') {
    console.log(path.resolve(__dirname, '../../../dist/assets'))
    router.use('/assets', express.static(path.resolve(__dirname, '../../../dist/')))
    router.use('/favicon.ico', express.static(path.resolve(__dirname,'../../client/assets/img/favicon.ico')))
    router.use('/static/img/:file', function (req, res) {
        var imgfile = path.join(__dirname, '../../', '/client/assets/img/' + req.params.file)
        res.sendFile(imgfile)
      })
} else {
    router.use('/favicon.ico', express.static(path.resolve(__dirname,'../../client/assets/img/favicon.ico')))
    router.use('/assets', express.static(path.resolve(__dirname, 'assets')))
    router.use('/static/img/:file', function (req, res) {
        var imgfile = path.join(__dirname, '../../', '/client/assets/img/' + req.params.file)
        res.sendFile(imgfile)
      })
}
router.use('/graphql', graphQLAuthentication, express_graphql({
    schema: schema,
    graphiql: true,
    context: {dbModel}
}))
router.use('/user', user)
router.use('/diet', diet)
// ssr request
router.get('*', (req, res) => {
    validateSession(req).then((user) => {
        let response = null
        const {content} = render({loggedIn: true, user: user}, {}, req)
        if (process.env.NODE_ENV === 'development') {
            response = template("Nutrition Informatics", {loggedIn: true, user: user}, content)
        } else {
            response = template("Nutrition Informatics", {loggedIn: true, user: user}, content)
        }
        res.setHeader('Cache-Control', 'assets, max-age=604800')
        res.send(response)
    }).catch((error) => {
        console.log(error)
        let response = null
        const {content} = render({}, {}, req)
        if (process.env.NODE_ENV === 'development') {
            response = template("Nutrition Informatics", {loggedIn: false, user: null}, content)
        } else {
            response = template("Nutrition Informatics", {loggedIn: false, user: null}, content)
        }
        res.setHeader('Cache-Control', 'assets, max-age=604800')
        res.send(response)
    })
})

export {router}