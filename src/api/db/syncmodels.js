import {dbModel} from '../models/init.js'

async function dbSync () {
    await dbModel.user.sync({force: true})
    await dbModel.role.sync({force: true})
    await dbModel.nutrition.sync({force: true})
    await dbModel.food.sync({force: true})
    await dbModel.foodNutrition.sync({force: true})
    await dbModel.foodNutritionMeasure.sync({force: true})
}
export{dbSync}