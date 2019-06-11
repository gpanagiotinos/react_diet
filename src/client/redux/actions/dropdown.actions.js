import {dropdownConstants} from '../constants'

export const dropdownActions = {
  dropdownSelect,
  dropdownQuery,
  dropdownSelectItem
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

function dropdownSelectItem (id, item) {
  return dispatch => {
    dispatch(select(id, item))
  }

  function select (id, item) {
    return {type: dropdownConstants.SELECT_DROPDOWN_ITEM, id, item}
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