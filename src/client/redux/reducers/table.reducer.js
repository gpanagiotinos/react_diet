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

export function tableRow(state = {}, action) {
  switch (action.type) {
    case tableConstants.REQUEST_ROW_DATA:
    return {
      requestResolved: false,
      rowData: action.data
    }
    case tableConstants.ADD_ROW_DATA:
      return {
        requestResolved: true,
        rowData: action.data
      }
    case tableConstants.FAILURE_ROW_DATA:
      return {
        requestResolved: true,
        rowData: action.data
      }
    default: 
      return state
  }
}