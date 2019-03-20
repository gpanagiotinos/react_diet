import {tableConstants, alertConstants} from '../constants'
import {usdaService} from '../../services'
import {paginationActions} from '../actions'
export const usdaActions = {
  usdaSearch,
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
        message: error
    }
  }
  function pagination(data, args) {
    const currentPagination = parseInt(args.offset) === 0 ? 0 : (((parseInt(args.offset) + parseInt(data.limit))/parseInt(data.limit)) - 1)
    console.log(currentPagination)
    return dispatch => {
      dispatch(paginationActions.addPaginationData(parseInt(args.offset), (parseInt(args.offset) + parseInt(data.limit)), parseInt(data.total), usdaActions.usdaSearch, args, currentPagination))
    }
  }
}

function usdaNutritionAction (ndbno, service) {
  return dispatch => {
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
      message: error
  }
  }
}