import fs from 'fs'
import path from 'path'
import {sequelize} from '../db/dbsqlite.js'


var dbModel = {}
fs
    .readdirSync('src/api/models')
    .filter((file) => {
        return ((file.substr(-3) === '.js') && (file !== 'init.js'))
    })
    .forEach((file) => {
        var model = sequelize.import(path.join(__dirname, file))
        dbModel[model.name] = model
    })
   export{dbModel}