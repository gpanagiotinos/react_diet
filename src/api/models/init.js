import fs from 'fs'
import path from 'path'
import {sequelize} from '../db/dbConnection.js'
import Food from './food.js'
import FoodNutrition from './foodNutrition.js'
import FoodNutritionMeasure from './foodNutritionMeasure.js'
import User from './user.js'
import Role from './role.js'
import Nutrition from './nutrition.js'

var dbModel = {
    Food: Food.init(sequelize),
    FoodNutrition: FoodNutrition.init(sequelize),
    FoodNutritionMeasure: FoodNutritionMeasure.init(sequelize),
    User: User.init(sequelize),
    Role: Role.init(sequelize),
    Nutrition: Nutrition.init(sequelize)
}

// fs
//     .readdirSync('src/api/models')
//     .filter((file) => {
//         return ((file.substr(-3) === '.js') && (file !== 'init.js'))
//     })
//     .forEach((file) => {
//         var model = require(path.join(__dirname, file)).default //TODO change to import
//         if (model !== undefined) {
//             dbModel[model.name] = model.init(sequelize)
//         }
//     })
   export{dbModel}