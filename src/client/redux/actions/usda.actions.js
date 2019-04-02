import {tableConstants, alertConstants, dropdownConstants} from '../constants'
import {usdaService} from '../../services'
import {paginationActions} from '../actions'
export const usdaActions = {
  usdaSearch,
  usdaListDropDown,
  usdaNutritionAction
}

function usdaSearch (text, offset) {
  return dispatch => {
    dispatch(request({text, offset}))
    usdaService.search(text, offset).then((data) => {
      dispatch(success(data.tableData))
      dispatch(pagination(data.paginationData, {text, offset}))
    }, (error) => {
      dispatch(failureAlert(error))
    })
  }
  function request(data) {
    return {
      type: tableConstants.REQUEST_TABLE_DATA,
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
        message: error.message
    }
  }
  function pagination(data, args) {
    const intOffset = parseInt(args.offset)
    const intLimit = (parseInt(args.offset) + parseInt(data.limit))
    console.log(intOffset, intLimit)
    const currentPagination = (intLimit/(intLimit-intOffset))
    return dispatch => {
      dispatch(paginationActions.addPaginationData(intOffset, intLimit, parseInt(data.total), usdaActions.usdaSearch, args, currentPagination))
    }
  }
}
function usdaListDropDown (listType, id, index) {
  return dispatch => {
    dispatch(request({listType}))
    switch (listType) {
      case 'groups':
        usdaService.foodGroupList()
        .then((data) => {
          console.log('dropdown', data)
          dispatch(success(id, data, index))
        }, (error) => {
          dispatch(failure())
          dispatch(failureAlert(error))
        })
      break
    }
  }
  function request(data) {
    return {
      type: dropdownConstants.REQUEST_DROPDOWN_DATA,
      data: []
    }
  }
  function success(id, data, index) {
    return {
      type: dropdownConstants.ADD_DROPDOWN_DATA,
      id, data, index
    }
  }
  function failure(data = {}) {
    return {
      type: dropdownConstants.FAILURE_DROPDOWN_DATA,
      data
    }
  }
  function failureAlert(error) {
    return {
        type: alertConstants.ERROR,
        message: error.message
    }
  }
}
function usdaNutritionAction(ndbno, service) {
  return dispatch => {
    dispatch(request({ndbno}))
    usdaService.availableServiceMethods[service](ndbno).then((data) => {
      dispatch(success(data))
    }, (error) => {
      dispatch(failureAlert(error))
    })
  }
  function request(data) {
    return {
      type: tableConstants.REQUEST_ROW_DATA,
      data
    }
  }
  function success(data) {
    return {
      type: tableConstants.ADD_ROW_DATA,
      data
    }
  }
  function failureAlert(error) {
    return {
      type: alertConstants.ERROR,
      message: error.message
  }
  }
}