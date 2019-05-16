import {menuConstants} from '../constants'

export const menuActions = {
  addMenuItem,
  removeMenuItem,
  increaseMenuItem
}

function addMenuItem (item) {
  return dispatch => {
    dispatch(add(item))
  }
  function add (item) {
    return {
      type: menuConstants.ADD_MENU_ITEM, item
    }
  }
}
function removeMenuItem(id) {
  return {
    type: menuConstants.REMOVE_MENU_ITEM, id
  }
}
function increaseMenuItem(id, value) {
  return {
    type: menuConstants.INCREASE_MENU_ITEM, id, value
  }
}