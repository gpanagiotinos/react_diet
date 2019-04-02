import {dropdownConstants} from '../constants'

export function dropdown(state = [], action) {
  switch(action.type) {
    case dropdownConstants.REQUEST_DROPDOWN_DATA:
      return {
        requestResolved: false,
        dropdownData: [...state]
      }
    case dropdownConstants.ADD_DROPDOWN_DATA:
      return {
        requestResolved: true,
        dropdownData:  [...state.dropdownData, {id: action.id, data: action.data, selectedIndex: action.selectedIndex}]
      }
      case dropdownConstants.FAILURE_DROPDOWN_DATA:
      return {
        requestResolved: true,
        dropdownData:  [...state]
      }
      case dropdownConstants.SELECT_DROPDOWN:
      return {...state, dropdownData: state.dropdownData.map((content) => {
        if (content.id === action.id) {
          return content.selectedIndex = action.index
        }
      })}
      case dropdownConstants.UNSELECT_DROPDOWN:
      return {
        requestResolved: true,
        dropdownData:  [...state.dropdownData.forEach((content) => {
          if (content.id === action.id) {
            console.log(content)
            return content.selectedIndex = null
          }
        })]
      }
      default: 
        return state
  }
}