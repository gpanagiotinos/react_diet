import {tableConstants} from '../constants'

export function table(state = {}, action) {
  switch(action.type) {
    case tableConstants.ADD_TABLE_DATA:
      return {
        tableData: action.data
      }
    default: 
      return state
  }
}