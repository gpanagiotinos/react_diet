import fake from 'faker'
import {dbModel} from '../models/init.js'

async function dbFake () {
    // fake data user
    for (let index = 0; index < 10; index++) {
        await dbModel.user.create({
            username: index === 0 || index === 1 ? ('george' + index) :fake.internet.userName(),
            password: '123456',
            createdAt: fake.date.recent(),
            updatedAt: fake.date.recent(),
            role: index === 0 ? '1000' : '1001'
        })
    }
    
    // fake data roles
    await dbModel.role.create({
        role_id: '1000',
        role_name: 'Super User'
    })
    await dbModel.role.create({
        role_id: '1001',
        role_name: 'Admin'
    })
    await dbModel.role.create({
        role_id: '1002',
        role_name: 'User'
    })
    await dbModel.role.create({
        role_id: '1003',
        role_name: 'Moderator'
    })
}
module.exports = dbFake