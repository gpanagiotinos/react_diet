import models from '../models/init.js'
import {GraphQLList, GraphQLNonNull, GraphQLObjectType,  GraphQLString, GraphQLID} from 'graphql'


const UserType = new GraphQLObjectType({
    name: 'UserType',
    fields: () => ({
        user_id: {
            type: GraphQLID
        },
        username: {
            type: GraphQLString
        },
        createdAt: {
            type: GraphQLString
        },
        updatedAt: {
            type: GraphQLString
        }
    })
})

const userQueries = {
    users: {
        type: new GraphQLList(UserType),
        resolve: async (rootValue, {input}) => {
            const user = await models.user.findAll()
            return user
        } 
    }
}

export {
    userQueries
}