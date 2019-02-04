import {GraphQLSchema, GraphQLObjectType} from 'graphql'
import {userQueries} from './queries.js'
 export default new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'Query',
        fields: () => ({...userQueries})
    })
 })