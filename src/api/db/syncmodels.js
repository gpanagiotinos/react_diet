import {dbModel} from '../models/init.js'
console.log(dbModel)
async function dbSync () {
    await dbModel.User.sync({force: true})
    await dbModel.Role.sync({force: true})
    await dbModel.Nutrition.sync({force: true})
    await dbModel.Food.sync({force: true})
    await dbModel.FoodNutrition.sync({force: true})
    await dbModel.FoodNutritionMeasure.sync({force: true})
}
export{dbSync}