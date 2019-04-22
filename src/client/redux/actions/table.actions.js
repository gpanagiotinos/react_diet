import {tableConstants} from '../constants'

export const tableActions = {
  addTableData,
  addRowData,
  addTableHead,
  addTableBody,
  addTableActions
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
function addTableHead (tableHead) {
  return {
    type: tableConstants.ADD_TABLE_HEAD,
    tableHead
  }
}
function addTableBody (tableBody) {
  return {
    type: tableConstants.ADD_TABLE_BODY, tableBody
  }
}
function addTableActions (tableActions) {
  return {
    type: tableConstants.ADD_TABLE_ACTIONS, tableActions
  }
}