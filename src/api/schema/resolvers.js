import {config} from '../../client/config'
import fetch from 'isomorphic-fetch'
const resolvers = {
    Query: {
        getUsers: {
            resolve: async (_, __, context) => {
                console.log(context)
                const users = await context.dbModel.user.findAll()
                return users
            } 
        },
        getUser: {
            resolve: async (_, {user_id}, context) => {
                const user = await context.dbModel.user.findOne({where: {user_id: user_id}})
                return user
            }
        },
        getUSDAData: {
            resolve: async(_, {text, offset}, context) => {
                const usdaData = await fetch(config.usdaUrlSearch('json', text, 'r', 25, offset), {method: 'GET', headers: {'Content-Type': 'application/json'}})
                const usdaDataJson = await usdaData.json()
                return usdaDataJson
            }
        },
        getUSDANutritionData: {
            resolve: async(_, {ndbno}, context) => {
                const USDANutritionData = await fetch(config.usdaNutritionSearch(ndbno, 'f', 'json'), {method: 'GET', headers: {'Content-Type': 'application/json'}})
                const NutritionData = await USDANutritionData.json()
                return NutritionData
            }
        }
    },
    Mutation: {
        setUSDAFood: async (_, {food}, context) => {
            const saveUSDAFoodData = await context.dbModel.food.findOrCreate({where: {ndbno: food.desc.ndbno}, defaults: food.desc})
            const saveFoodNutrition = await Promise.all(food.nutrients.map(async (nutrition) => {
                const createNutrition = await context.dbModel.foodNutrition.create({
                    foodId: saveUSDAFoodData[0].dataValues.id,
                    nutritionId: nutrition.nutrient_id,
                    derivation: nutrition.derivation,
                    group: nutrition.group,
                    name: nutrition.name,
                    unit: nutrition.unit,
                    value: nutrition.value
                })
                console.log(createNutrition)
                return createNutrition
            }))
            return saveFoodNutrition
            }
        }   
}
export{resolvers}