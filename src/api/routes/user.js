import express from 'express'
import {dbModel} from '../models/init.js'
import {sessionSave, deleteSession} from '../helpers/session.helpers.js'
import {errorHandler} from '../helpers/error.helpers.js'
const router = express.Router()
const checkUser = async (username, password, session) => {
    try {
        const user = await dbModel.User.validateUsernamePassword(username, password)
        console.log(user)
        if (!user) {
           return Promise.reject({status: 401, message: 'The username and password you entered did not match our records. Please double-check and try again.'})
        } else {
            sessionSave(session, user.dataValues)
            console.log(session)
            return session.data
        }
    } catch (error) {
        return Promise.reject(error)
    }
    
}
router.post('/login', (req, res) => {
    checkUser(req.body.username, req.body.password, req.session).then((user) => {
        res.status(200)
        res.json({
            user: user,
            message: 'Successful Login'
        })
        res.end()  
    }).catch((error) => {
        errorHandler(error, res)
    })
})

router.delete('/logout', (req, res) => {
 deleteSession(req).then(() => {
    res.status(200)
    res.json({
        message: 'Logout'
    })
    res.end()
 }).catch((error) => {
     errorHandler(error, res)
 })
})
export {router}