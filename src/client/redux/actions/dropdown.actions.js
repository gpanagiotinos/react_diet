import {dropdownConstants} from '../constants'

export const dropdownActions = {
  dropdownSelect,
  dropdownQuery
}

function dropdownSelect (index, id, flag) {
  return dispatch => {
    if (flag) {
      dispatch(select(index, id))
    } else {
      dispatch(unselect(id))
    }
  }
  function select (index, id) {
    return {type: dropdownConstants.SELECT_DROPDOWN, index, id}
  }
  function unselect (id) {
    return {type: dropdownConstants.UNSELECT_DROPDOWN, id}
  }
}

function dropdownQuery (QueryObject, id) {
  return dispatch => {
    dispatch(addQuery(QueryObject, id))
  }
  function addQuery (QueryObject) {
    return {
      type: dropdownConstants.ADD_DROPDOWN_QUERY, QueryObject, id
    }
  }
}