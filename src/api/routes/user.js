import express from 'express'
import models from '../models/init.js'
const router = express.Router()

router.post('/login', (req, res) => {
    console.log(req)
    res.status(200)
    res.json({
        message: 'Login'
    })
    res.end()
})

export {router}