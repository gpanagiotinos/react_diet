import {config} from '../config'
import {apollo} from './apollo.service.js'
import {usdaActions, paginationActions} from '../redux/actions'

function search(text, offset) {
  return apollo.apolloQuery('GET_USDADATA')(text, offset)
    .then(handleUSDADataResponse)
    .then((data) => {
      return data
    })
}
function handleUSDADataResponse (response) {
  let tableData = {}
  let paginationData = {}
  console.log(response)
  if (response.data.getUSDAData.list !== null) {
    tableData = {...{
      head: ['group', 'name', 'ds', 'manu', 'Actions'],
      body: USDADataTableBody(response.data.getUSDAData.list.item)
    }}
    paginationData = {...{
      offset: response.data.getUSDAData.list.start,
      limit: response.data.getUSDAData.list.end,
      total: response.data.getUSDAData.list.total
    }}
  }
  return {tableData, paginationData}
}
function handleUSDANutritionResponse(response) {
  let rowData = {}
  if (response.data.getUSDANutritionData.foods[0].food !== null) {
    rowData = {...{
      rowID: response.data.getUSDANutritionData.foods[0].food.desc.ndbno,
      data: response.data.getUSDANutritionData.foods[0].food
    }}
  }
  return rowData
}

function USDADataTableBody (items = []) {
  return items.map((object) => {
    object['Actions'] = [
      {
        icon: 'info',
        label: 'Show Nutrition',
        service: 'showNutrition',
        args: object['ndbno'],
        action: usdaActions.usdaNutritionAction,
        component: 'NutritionRow'
      },
      {
        icon: 'save',
        label: 'Save Nutrition',
        service: 'saveNutrition',
        args: object['ndbno'],
        action: usdaActions.usdaNutritionAction,
        component: ''
      }
    ]
    return object
  })
}
const availableServiceMethods = {
  'showNutrition': (itemID) => {
    return apollo.apolloQuery('GET_USDANUTRITION')(itemID)
    .then(handleUSDANutritionResponse)
    .then((data) => {
      console.log(data)
      return data
    })
  },
  'saveNutrition': (itemID) => {
    return apollo.apolloQuery('GET_USDANUTRITION')(itemID)
    .then(handleUSDANutritionResponse)
    .then((data) => {
      const {__typename, ...nutritionData} = data.data.desc
      console.log('nutritionData', nutritionData)
      return nutritionData
    })
    .then((nutrition) => {
      console.log('set data food', nutrition)
      return apollo.apolloMutation('SET_USDAFOOD')(nutrition)
    })
    .then((data) => {
      console.log('set food', data)
      return data
    })
  }
}

export const usdaService = {
  search,
  availableServiceMethods
}