const resolvers = {
    Query: {
        getUsers: {
            resolve: async (_, __, context) => {
                const users = await context.models.user.findAll()
                return users
            } 
        },
        getUser: {
            resolve: async (_, {user_id}, context) => {
                const user = await context.models.user.findOne({where: {user_id: user_id}})
                return user
            }
        }
    }
}
module.exports = resolvers