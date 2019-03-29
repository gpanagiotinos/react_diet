import fake from 'faker'
import {dbModel} from '../models/init.js'
import {config} from '../../client/config'
import fetch from 'isomorphic-fetch'
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
async function createNutritions (max = 196) {
    const usdaNutritionsFetch = await fetch(config.usdaLists('n', max, 0,'n','json'), {method: 'GET', headers: {'Content-Type': 'application/json'}})
    const nutritionsJSON = await usdaNutritionsFetch.json()
    return nutritionsJSON
}

async function dbFake () {
    console.log(dbModel.User)
    // fake data user
    for(const user of createFakeUsers()) {
        const userCreate = await dbModel.User.create(user)
    }
    
    // fake data roles
    for(const role of createFakeRoles()) {
        const rolesCreate = await dbModel.Role.create(role)
    }
    //USDA data Nutritions
    createNutritions().then(async (data) => {
        for(const nutritionObject of data.list.item) {
            const nutritionCreate = await dbModel.Nutrition.create({nutrition_id: nutritionObject.id, nutrition_name: nutritionObject.name})
        }
    }).catch((error) => {
        console.log(error)
    })
}
export {dbFake}