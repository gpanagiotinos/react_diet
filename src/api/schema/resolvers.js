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
        setUSDAFood: (_, {food}, context) => {
                const saveUSDAFoodData = context.dbModel.food.findOrCreate({
                   where: {ndbno: food.ndbno},
                   defaults: food
                })
                return food
            }
        }   
}
export{resolvers}