import fake from 'faker'
import {dbModel} from '../models/init.js'
import {config} from '../config.js'
import fetch from 'isomorphic-fetch'
import {redisOptions} from '../config/redis.js'
import {promisify} from 'util'
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
const saveDataLocaly = async (food) => {
    try {
        const [saveFood, wasFoodCreated] = await context.dbModel.Food.findOrCreate({where: {ndbno: food.desc.ndbno}, defaults: food.desc})
        if (wasFoodCreated) {
            const createNutrition = await food.nutrients.reduce((previousPromise, nutrition) => {
                return previousPromise.then(() => {
                    return new Promise((resolve, reject) => {
                        context.dbModel.Nutrition.findOrCreate({where: {nutrient_id: nutrition.nutrient_id}, defaults: {
                                nutrient_id: nutrition.nutrient_id,
                                nutrient_name: nutrition.name
                            }}).then(([data, createdFlag]) => {
                                nutrition['nutritionId'] = data.dataValues.id
                                return context.dbModel.FoodNutrition.findOrCreate({where: {foodId: saveFood.dataValues.id, nutritionId: nutrition.nutritionId}, defaults: nutrition})
                            }).then(([data, createdFlag]) => {
                                const bulkArray = nutrition.measures.map((measure) => {
                                    return {...measure, ...{foodNutritionId: data.dataValues.id}} 
                                })
                                return context.dbModel.FoodNutritionMeasure.bulkCreate(bulkArray)
                            }).then((data) => {
                                resolve(data)
                            }).catch((error) => {
                                reject(error)
                            })  
                    })
                })
            }, Promise.resolve())
            return {desc: saveFood, nutrients: createNutrition}
        } else {
            console.log('Already Saved')
            return {desc: saveFood, nutrients: createNutrition}
        }  
    } catch (error) {
        console.log(error)
        return Promise.reject(error)
    }
}
const getRandomDataFromUSDA = async () => {
    try {
        const availableGroups = ['1800', '1300', '1400', '0800', '2000', '0100', '2100', '1500', '0900', '1700', '1000', '2500', '0600', '1900', '1100']
        let items = []
        for(const foodGroupID of availableGroups) {
          const FoodSearch = await fetch(config.usdaGroup100Foods(foodGroupID), {method: 'GET', headers: {'Content-Type': 'application/json'}})
          const FoodList = await FoodSearch.json()
          items = [...items, ...FoodList.list.item]
        }
        //console.log(items.length)
        let arrayData = []
        for(const item of items) {
            const response = await fetch(config.usdaNutritionSearch(item.ndbno, 'b', 'json'))
            const data = await response.json()
            arrayData.push(data.foods[0].food)
        }
        for(const item of arrayData) {
            console.log(item)
            const response = await saveDataLocaly(item)
        }
    } catch (error) {
        Promise.reject(error)
    }
}

// fake data diet
// filter data 
const filterData = (item) => {
    return (parseFloat(item.cardo) <= 50) && (parseFloat(item.fat) <= 30) && (parseFloat(item.protein) <= 20) && (parseFloat(item.sugar) <= 5)
  }
// Compute random foods
const ComputeFoods = async () => {
    try {
      const availableGroups = ['1800', '1300', '1400', '0800', '2000', '0100', '2100', '1500', '0900', '1700', '1000', '2500', '0600', '1900', '1100']
      let items = []
      for(const foodGroupID of availableGroups) {
        const FoodSearch = await fetch(config.usdaGroup100Foods(foodGroupID), {method: 'GET', headers: {'Content-Type': 'application/json'}})
        const FoodList = await FoodSearch.json()
        items = [...items, ...FoodList.list.item]
      }
      //console.log(items.length)
      let arrayData = []
      for(const item of items) {
        try {
          const response = await fetch(config.usdaNutritionSearch(item.ndbno, 'b', 'json'))
          const data = await response.json()
          arrayData.push(data.foods[0].food)
          console.log(arrayData.length)
        } catch (error) {
          Promise.reject(error)
        }
      }
      let redisData = []
      for(const item of arrayData) {
        let gram320 = 100
        let gram60 = 100
        let NutrientLimits = {
          ndbno: item.desc.ndbno,
          name: item.desc.name,
          gram320: null,
          gram60: null,
          cardo: null,
          fat: null,
          protein: null,
          sugar: null
        }
        item.nutrients.map((nutrient) => {
          if (nutrient.nutrient_id === '208') {
            gram320 = ((100*320)/nutrient.value).toFixed(2)
            gram60 = ((100*60)/nutrient.value).toFixed(2)
          }
        })
        NutrientLimits.gram320 = gram320
        NutrientLimits.gram60 = gram60
        for(const nutrient of item.nutrients) {
          switch (nutrient.nutrient_id) {
            case '205':
              NutrientLimits.cardo = nutrient.value
            break
            case '203':
              NutrientLimits.protein = nutrient.value
            break
            case '269':
              NutrientLimits.sugar = nutrient.value
            break
            case '204':
              NutrientLimits.fat = nutrient.value
            break
          }
        }
        redisData.push(NutrientLimits)
      }
      const dietFiltering = redisData.filter(filterData)
      const redisStringData = dietFiltering.map((item) => {
        let hashKey = `ndbno${item.ndbno}`
        Object.keys(item).map((key) => {
          if (key !== 'ndbno') {
           redisOptions.client.hset(hashKey,  `${key}`, `${item[key]}`, (error, reply) => {
             if (error) {
               console.log('Error', error)
             } else {
              console.log(reply.toString())
             }
             
           })
          } 
        })
        console.log(hashKey)
        return hashKey
      })
      // console.log(redisStringData)
      return dietFiltering
    } catch (error) {
      Promise.reject(error)
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
        ComputeFoods().then((response) => {
            console.log(response)
        }).catch((error) => {
            console.log(error)
        })
    }
}
export {dbFake}