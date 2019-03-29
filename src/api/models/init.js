import fs from 'fs'
import path from 'path'
import {sequelize} from '../db/dbsqlite.js'
import User from './user.js'

var dbModel = {}

fs
    .readdirSync('src/api/models')
    .filter((file) => {
        return ((file.substr(-3) === '.js') && (file !== 'init.js'))
    })
    .forEach((file) => {
        var model = require(path.join(__dirname, file)).default //TODO change to import
        if (model !== undefined) {
            dbModel[model.name] = model.init(sequelize)
        }
    })
   export{dbModel}