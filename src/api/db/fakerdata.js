import fake from 'faker'
import {dbModel} from '../models/init.js'
function createFakeUsers () {
    let fakeUserArray = []
    for (let index = 0; index < 10; index++) {
        fakeUserArray.push({
            username: 'george',
            password: '123456',
            createdAt: fake.date.recent(),
            updatedAt: fake.date.recent(),
            role: index === 0 ? '1000' : '1001'
        })  
    }
    return fakeUserArray
}
function createFakeRoles () {
    let fakeRoles = []
    let roleNames = ['Super User', 'Admin', 'User', 'Moderator']
    for (let index = 0; index < 4; index++) {
        fakeRoles.push({
            role_id: '100' + index,
            role_name: roleNames[index]
        })
    }
    return fakeRoles
}

async function dbFake () {
    // fake data user
    for(const user of createFakeUsers()) {
        const userCreate = await dbModel.user.create(user)
    }
    
    // fake data roles
    for(const role of createFakeRoles()) {
        const rolesCreate = await dbModel.role.create(role)
    }
}
export {dbFake}