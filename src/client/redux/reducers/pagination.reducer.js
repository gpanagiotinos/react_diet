import {paginationConstants} from '../constants'

export function pagination(state = {}, action) {
  switch(action.type) {
    case paginationConstants.ADD_PAGINATION_DATA:
      return action.paginationData
    case paginationConstants.REMOVE_PAGINATION_DATA:
      return action.paginationData
    default:
      return state
  }
}