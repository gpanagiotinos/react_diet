import express from 'express'
import {dbModel} from '../models/init.js'
import fetch from 'isomorphic-fetch'
import {config} from '../config.js'
import {redisOptions} from '../config/redis.js'
import {promisify} from 'util'
const router = express.Router()

const ComputeFoods = async () => {
  try {
    const availableGroups = ['1800']
    const FoodSearch = await fetch(config.usdaGroup100Foods('0900'), {method: 'GET', headers: {'Content-Type': 'application/json'}})
    const FoodList = await FoodSearch.json()
    let arrayData = []
    for(const item of FoodList.list.item) {
      try {
        const response = await fetch(config.usdaNutritionSearch(item.ndbno, 'b', 'json'))
        const data = await response.json()
        arrayData.push(data.foods[0].food)
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
    const redisStringData = redisData.map((item) => {
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
      return hashKey
    })
    // console.log(redisStringData)
    return redisData
  } catch (error) {
    Promise.reject(error)
  } 
}
const keysAsync = promisify(redisOptions.client.keys).bind(redisOptions.client)
const hgetallAsync =  promisify(redisOptions.client.hgetall).bind(redisOptions.client)
const filterData = (item) => {
  return (parseFloat(item.cardo) <= 50) && (parseFloat(item.fat) <= 30) && (parseFloat(item.protein) <= 20) && (parseFloat(item.sugar) <= 5)
}

const shuffleData = (array) => {
  let j, temp
  let arrayLength = array.length
  for (let index = arrayLength - 1; index > 0; index--) {
     j = Math.floor(Math.random() * (index + 1))
     temp = array[index]
     array[index] = array[j]
     array[j] = temp
  }
  return array
}
const Calculate = async () => {
  const keys = await keysAsync('ndbno*')
  const shuffleKeys = [...shuffleData(keys)]
  let keysData = []
  for(const key of shuffleKeys) {
    try {
      const data = await hgetallAsync(key)
      keysData.push(data)
    } catch (error) {
      Promise.reject(error)
    }
  }
  const dietFinal = keysData.filter(filterData)
  return dietFinal
}
router.post('/compute_foods', (req, res) => {
  ComputeFoods().then((response) => {
    res.status(200)
    res.json({
      FoodList: response,
    })
    res.end() 
  }).catch((error) => {
    res.status(500)
    res.json({
      error: error,
    })
    res.end() 
  })
})

router.post('/calculate', (req, res) => {
  Calculate().then((response) => {
    res.status(200)
    res.json({
      Keys: response,
    })
    res.end() 
  }).catch((error) => {
    res.status(500)
    res.json({
      error: error,
    })
    res.end() 
  })
})

export {router}