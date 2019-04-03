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
            resolve: async(_, {text, foodGroup, offset}, context) => {
                const usdaData = await fetch(config.usdaUrlSearch('json', text, 'r', 25, offset, foodGroup), {method: 'GET', headers: {'Content-Type': 'application/json'}})
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
        },
        getUSDAListData: {
            resolve: async(_, {lt, max, offset, sort, format}, context) => {
                const USDAList = await fetch(config.usdaLists(lt, max, offset, sort, format), {method: 'GET', headers: {'Content-Type': 'application/json'}})
                const ListData = await USDAList.json()
                return ListData
            }
        }
    },
    Mutation: {
        setUSDAFood: async (_, {food}, context) => {
            try {
                const [saveFood, wasFoodCreated] = await context.dbModel.Food.findOrCreate({where: {ndbno: food.desc.ndbno}, defaults: food.desc})
                if (wasFoodCreated) {
                    const createNutrition = await food.nutrients.reduce((previousPromise, nutrition) => {
                        return previousPromise.then(() => {
                            return new Promise((resolve, reject) => {
                                context.dbModel.Nutrition.findOrCreate({where: {nutrient_id: nutrition.nutrient_id}, defaults: {
                                        nutrient_id: nutrition.nutrient_id,
                                        nutrient_name: nutrition.name
                                    }}).then(([data, createdFlag]) => {
                                        nutrition['nutritionId'] = data.dataValues.id
                                        return context.dbModel.FoodNutrition.findOrCreate({where: {foodId: saveFood.dataValues.id, nutritionId: nutrition.nutritionId}, defaults: nutrition})
                                    }).then(([data, createdFlag]) => {
                                        const bulkArray = nutrition.measures.map((measure) => {
                                            return {...measure, ...{foodNutritionId: data.dataValues.id}} 
                                        })
                                        return context.dbModel.FoodNutritionMeasure.bulkCreate(bulkArray)
                                    }).then((data) => {
                                        resolve(data)
                                    }).catch((error) => {
                                        reject(error)
                                    })  
                            })
                        })
                    }, Promise.resolve())
                    return saveFood
                } else {
                    console.log('Already Saved')
                    return saveFood
                }  
            } catch (error) {
                return Promise.reject(error)
            }
        }
    }   
}
export{resolvers}