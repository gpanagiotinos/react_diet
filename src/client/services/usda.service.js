import {config} from '../config'
import {apollo} from './apollo.service.js'
import {usdaActions} from '../redux/actions'
export const usdaService = {
  search,
  availableServiceMethods
}

function search(text, offset) {
  return apollo.apolloQuery('GET_USDADATA')(text, offset)
    .then(handleUSDADataResponse)
    .then((data) => {
      return data
    })
}

// function searchItem(itemID) {
//   return apollo
// }

function handleUSDADataResponse (response) {
  let tableData = {}
  if (response.data.getUSDAData.list !== null) {
    tableData = {...{
      head: ['group', 'name', 'ds', 'manu', 'Actions'],
      body: USDADataTableBody(response.data.getUSDAData.list.item)
    }}
  }
  return tableData
}

function USDADataTableBody (items = []) {
  return items.map((object) => {
    object['Actions'] = [
      {
        icon: 'info',
        label: 'Show Nutrition',
        service: 'showNutrition',
        args: object['ndbno'],
        action: usdaActions.usdaNutritionAction
      }
    ]
    return object
  })
}
const availableServiceMethods = {
  'showNutrition': (itemID) => {
    return apollo.apolloQuery('GET_USDANUTRITION')(itemID)
    .then(handleUSDADataResponse)
    .then((data) => {
      console.log(data)
      return data
    })
  }
}