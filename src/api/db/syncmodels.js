import {dbModel} from '../models/init.js'
async function dbSync () {
    if (process.env.NODE_ENV === 'development') {
        await dbModel.User.sync({force: true})
        await dbModel.Role.sync({force: true})
        await dbModel.Nutrition.sync({force: false})
        await dbModel.Food.sync({force: false})
        await dbModel.FoodNutrition.sync({force: false})
        await dbModel.FoodNutritionMeasure.sync({force: false})
    } else {
        await dbModel.User.sync({force: false})
        await dbModel.Role.sync({force: false})
        await dbModel.Nutrition.sync({force: false})
        await dbModel.Food.sync({force: false})
        await dbModel.FoodNutrition.sync({force: false})
        await dbModel.FoodNutritionMeasure.sync({force: false})
    }

}
export{dbSync}