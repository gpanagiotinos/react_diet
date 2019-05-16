import {apollo} from '../apollo/apollo.service.js'
import {usdaActions, paginationActions} from '../redux/actions'
import {removeObjectAttribute} from '../redux/helpers'

function search(text, foodGroup, offset) {
  return apollo.apolloQuery('GET_USDADATA')(text, foodGroup, offset)
    .then(handleUSDADataResponse)
    .then((data) => {
      console.log('data', data)
      return data
    }, (error) => {
      console.error('My Error', error)
    })
}
function handleUSDADataResponse (response) {
  let tableData = {}
  let paginationData = {}
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
      return data
    })
  },
  'saveNutrition': (itemID) => {
    return apollo.apolloQuery('GET_USDANUTRITION')(itemID)
    .then(handleUSDANutritionResponse)
    .then((data) => {
      const {...foodDesc} = data.data.desc
      const [...foodNutrients] = data.data.nutrients
      return {desc: foodDesc, nutrients: foodNutrients}
    })
    .then((nutrition) => {
      return apollo.apolloMutation('SET_USDAFOOD')(removeObjectAttribute(nutrition)('__typename'))
    })
    .then((data) => {
      return data
    })
  }
}

function foodGroupList (lt = 'g', max = 26, offset = 0, sort = 'n', format = 'json') {
  return apollo.apolloQuery('GET_USDALISTDATA')(lt, max, offset, sort, format)
  .then(handleList)
  .then((data) => {
    return data
  })
  function handleList(response) {
    return response.data.getUSDAListData.list.item
  }
}
function foodSearchList (text, foodGroup, offset=0, max=100) {
  return apollo.apolloQuery('GET_USDASEARCHLIST')(text, foodGroup, offset, max)
  .then(handlefoodSearchList)
  .then((data) => {
    return data
  })
  function handlefoodSearchList(response) {
    return response.data.getUSDAData.list.item.map((item) => {
      return {
        id: item.ndbno,
        name: item.name,
        offset: item.offset
      }
    })
  }
}

export const usdaService = {
  search,
  foodGroupList,
  foodSearchList,
  availableServiceMethods
}