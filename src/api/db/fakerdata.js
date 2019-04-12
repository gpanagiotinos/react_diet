import fake from 'faker'
import {dbModel} from '../models/init.js'
import {config} from '../config.js'
import fetch from 'isomorphic-fetch'
function createFakeUsers () {
    let fakeUserArray = []
    for (let index = 0; index < 2; index++) {
        fakeUserArray.push({
            username: index === 0 ? 'george' : 'georgepounis',
            password: index === 0 ? 'george1991' : 'georgepounis',
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
async function createFakeFood () {
    let fakeFood = {
        desc: {
            ndbno: fake.random.uuid(),
            name: fake.random.word(),
            sd: null,
            fg: null,
            sn: null,
            cn: null,
            nf: null,
            cf: null,
            ff: null,
            pf: null,
            r: null,
            rd: null,
            ds: fake.random.word(),
            manu: fake.random.word(),
            ru: fake.random.word()
        },
        nutrients: [
            {
                nutrient_id: '1',
                name: fake.random.word(),
                derivation: fake.random.word(),
                group: fake.random.word(),
                unit: fake.random.word(),
                value: fake.random.word(),
                se: null,
                dp: null,
                sourcecode: null,
                measures : [{
                    label: fake.random.word(),
                    eqv: fake.random.word(),
                    eunit: fake.random.word(),
                    qty: fake.random.word(),
                    value : fake.random.word()
                }]
            },
            {
                nutrient_id: '2',
                name: fake.random.word(),
                derivation: fake.random.word(),
                group: fake.random.word(),
                unit: fake.random.word(),
                value: fake.random.word(),
                se: null,
                dp: null,
                sourcecode: null,
                measures: [
                    {
                        label: fake.random.word(),
                        eqv: fake.random.word(),
                        eunit: fake.random.word(),
                        qty: fake.random.word(),
                        value: fake.random.word()
                    },
                    {
                        label: fake.random.word(),
                        eqv: fake.random.word(),
                        eunit: fake.random.word(),
                        qty: fake.random.word(),
                        value: fake.random.word()
                    }
                ]
            }  
        ],
    }
    try {
        const [saveFood, wasFoodCreated] = await dbModel.Food.findOrCreate({where: {ndbno: fakeFood.desc.ndbno}, defaults: fakeFood.desc})
        if (wasFoodCreated) {
            const createNutrition = await fakeFood.nutrients.reduce((previousPromise, nutrition) => {
                return previousPromise.then(() => {
                    return new Promise((resolve, reject) => {
                        dbModel.Nutrition.findOrCreate({where: {nutrient_id: nutrition.nutrient_id}, defaults: {
                                nutrient_id: nutrition.nutrient_id,
                                nutrient_name: nutrition.name
                            }}).then(([data, flag]) => {
                                nutrition['nutritionId'] = data.dataValues.id
                                return dbModel.FoodNutrition.findOrCreate({where: {foodId: saveFood.dataValues.id, nutritionId: nutrition.nutritionId}, defaults: nutrition})
                            }).then(([data, flag]) => {
                                const bulkArray = nutrition.measures.map((measure) => {
                                    return {...measure, ...{foodNutritionId: data.dataValues.id}} 
                                })
                                return dbModel.FoodNutritionMeasure.bulkCreate(bulkArray)
                            }).then((data) => {
                                resolve('My data', data)
                            }).catch((error) => {
                                reject(error)
                            })  
                    })
                })
            }, Promise.resolve())
            return createNutrition
        }   
    } catch (error) {
        return Promise.reject(error)
    }
}

async function dbFake () {
    if (process.env.NODE_ENV === 'development') {
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
                const nutritionCreate = await dbModel.Nutrition.create({nutrient_id: nutritionObject.id, nutrient_name: nutritionObject.name})
            }
        }).catch((error) => {
            console.log(error)
        })
    }
}
export {dbFake}