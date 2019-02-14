import fake from 'faker'
const models = require('../models/init.js')

async function dbFake () {
    // fake data user
    for (let index = 0; index < 10; index++) {
        await models.user.create({
            username: fake.internet.userName(),
            password: '123456',
            createdAt: fake.date.recent(),
            updatedAt: fake.date.recent(),
            role: '1000'
        })
    }
    
    // fake data roles
    await models.role.create({
        role_id: '1000',
        role_name: 'Super User'
    })
    await models.role.create({
        role_id: '1001',
        role_name: 'Admin'
    })
    await models.role.create({
        role_id: '1002',
        role_name: 'User'
    })
    await models.role.create({
        role_id: '1003',
        role_name: 'Moderator'
    })
}
module.exports = dbFake