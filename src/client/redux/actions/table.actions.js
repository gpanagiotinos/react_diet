import {tableConstants} from '../constants'

export const tableActions = {
  addTableData,
  addRowData,
}

function addTableData (data) {
  return {type: tableConstants.ADD_TABLE_DATA, data}
}

function addRowData (data) {
  return {
    type: tableConstants.ADD_ROW_DATA,
    data
  }
}