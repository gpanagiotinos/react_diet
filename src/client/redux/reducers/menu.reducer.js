import {menuConstants} from '../constants'

export function menu (state={items: []}, action) {
  switch(action.type) {
    case menuConstants.ADD_MENU_ITEM:
      return {
        items: [...state.items.filter((item) => {
          return item.id !== action.item.id
        }), action.item]
      }
    case menuConstants.REMOVE_MENU_ITEM:
      return {
        items: [...state.items.filter((item) => {
          return item.id !== action.id
        })]
      }
    case menuConstants.INCREASE_MENU_ITEM:
      return {
        items: [...state.items.map((item) => {
          if (item.id === action.id) {
            return {...item, value: parseInt(action.value)}
          } else {
            return item
          }
        })]
      }
    default:
      return state
  }
}