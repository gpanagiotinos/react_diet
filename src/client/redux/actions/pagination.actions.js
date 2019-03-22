import {paginationConstants} from '../constants'

export const paginationActions = {
  addPaginationData,
  removePaginationData
}

function addPaginationData (offset, limit, total, action, args, currentPagination = 1) {
  let paginationData = {
    offset: offset,
    limit: limit,
    total: total,
    paginationAction: action,
    actionArgs: args,
    currentPagination: currentPagination
  }
  console.log(paginationData)
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