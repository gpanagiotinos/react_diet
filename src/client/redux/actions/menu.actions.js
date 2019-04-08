import {menuConstants} from '../constants'

export const menuActions = {
  addMenuItem
}

function addMenuItem (content, item) {
  return dispatch => {
    dispatch(add(content, item))
  }
  function add (content, item) {
    return {
      type: menuConstants.ADD_MENU_ITEM,
      content, item
    }
  }
}