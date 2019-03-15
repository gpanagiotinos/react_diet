import {tableConstants, alertConstants} from '../constants'
import {usdaService} from '../../services'

export const usdaActions = {
  usdaSearch,
  usdaNutritionAction
}
console.log()
function usdaSearch (text, offset) {
  return dispatch => {
    dispatch(request({text, offset}))
    usdaService.search(text, offset).then((data) => {
      dispatch(success(data))
    }, (error) => {
      console.log(error)
      dispatch(failureAlert(error))
    })
  }
  function request(data) {
    return {
      type: 'REQUEST',
      data
    }
  }
  function success(data) {
    return {
      type: tableConstants.ADD_TABLE_DATA,
      data
    }
  }
  function failureAlert(error) {
    return {
        type: alertConstants.ERROR,
        message: error
    }
  }
}

function usdaNutritionAction (ndbno, service) {
  console.log(ndbno, service)
  console.log(usdaService)
  return {}
  // usdaService.availableServiceMethods[service](ndbno).then((data) => {
  //   console.log(data)
  //   return {}
  // }, (error) => {
  //   console.log(error)
  //   return {}
  // })
}