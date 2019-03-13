import {tableConstants} from '../constants'

export function table(state = {}, action) {
  switch(action.type) {
    case tableConstants.REQUEST_TABLE_DATA:
    return {
      requestResolved: false,
      tableData: action.data
    }
    case tableConstants.ADD_TABLE_DATA:
      return {
        requestResolved: true,
        tableData: action.data
      }
    case tableConstants.FAILURE_TABLE_DATA:
      return {
        requestResolved: true,
        tableData: action.data
      }
    default: 
      return state
  }
}