import {tableConstants} from '../constants'

export const tableActions = {
  addTableData,
}

function addTableData (data) {
  return {type: tableConstants.ADD_TABLE_DATA, data}
}