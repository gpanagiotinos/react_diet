import router from 'express.Router()'
import models from '../models/init.js'


router.post('/login', (req, res) => {
    res.status(200)
    res.json({
        message: 'Login'
    })
    res.end()
})