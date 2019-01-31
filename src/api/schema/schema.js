import {GraphQLSchema, GraphQLObjectType} from 'graphql'
import {userQueries} from './resolvers.js'
console.log('userQueries', userQueries)
 export default new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'Query',
        fields: () => ({userQueries})
    })

 })