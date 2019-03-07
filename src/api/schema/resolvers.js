import {config} from '../../client/config'
import fetch from 'node-fetch'
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
            resolve: async(_, {text}, context) => {
                const usdaData = await fetch(config.usdaUrlSearch(text, 'n', 25, 0), {method: 'GET', headers: {'Content-Type': 'application/json'}})
                const usdaDataJson = await usdaData.json()
                return usdaDataJson
            }
        }
    }
}
module.exports = resolvers