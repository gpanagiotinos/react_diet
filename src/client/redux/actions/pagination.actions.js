import {paginationConstants} from '../constants'

export const paginationActions = {
  addPaginationData,
  removePaginationData
}

function addPaginationData (offset, limit, total, action, args) {
  let paginationData = {
    offset: offset,
    limit: limit,
    total: total,
    paginationAction: action,
    actionArgs: args
  }
  return {
    type: paginationConstants.ADD_PAGINATION_DATA,
    paginationData
  }
}
function removePaginationData () {
  let paginationData = {}
  return {
    type: paginationConstants.REMOVE_PAGINATION_DATA,
    paginationData
  }
}