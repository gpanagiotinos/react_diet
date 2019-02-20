import express from 'express'
import {dbModel} from '../models/init.js'
import {sessionHelpers} from '../rbac/session.helpers.js'
import { findIconDefinition } from '@fortawesome/fontawesome-svg-core';
import { rejects } from 'assert';
const router = express.Router()
console.log(dbModel)
const checkUser = async (username, password, session) => {
    try {
        const user = await dbModel.user.findOne({where: {username: username, password: password}})
        if (!user) {
           throw new Error('User Not Found')
        } else {
            sessionHelpers.sessionSave(session, user.dataValues)
            return user
        }
    } catch (error) {
        console.log(error)
    }
    
}
router.post('/login', (req, res) => {
    console.log(req.session.data)
    checkUser(req.body.username, req.body.password, req.session).then((user) => {
        console.log(user)
        res.status(200)
        res.json({
            message: 'Login'
        })
        res.end()  
    }).catch((error) => {
        res.status(401)
        res.json({
            message: 'Login'
        })
        res.end()
    })
})

export {router}