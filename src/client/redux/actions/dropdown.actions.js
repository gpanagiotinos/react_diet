import {dropdownConstants} from '../constants'

export const dropdownActions = {
  dropdownSelect
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