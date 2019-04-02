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
    console.log(index, id)
    return {type: dropdownConstants.SELECT_DROPDOWN, index, id}
  }
  function unselect (id) {
    console.log(id)
    return {type: dropdownConstants.UNSELECT_DROPDOWN, id}
  }
}