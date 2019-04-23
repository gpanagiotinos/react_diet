import express from 'express'
import {dbModel} from '../models/init.js'
import { router } from './user.js';
import fetch from 'isomorphic-fetch'
import {config} from '../config.js'

const ComputeFoods = async () => {
  try {
    const availableGroups = ['1800']
    const FoodSearch = await fetch(config.usdaGroup100Foods('1800'), {method: 'GET', headers: {'Content-Type': 'application/json'}})
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
      console.log([...NutrientLimits])
      redisData.push(NutrientLimits)
    }
    return redisData
  } catch (error) {
    Promise.reject(error)
  }
  
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

export {router}