import {dropdownConstants} from '../constants'

export function dropdown(state = {requestResolved: false, dropdownData: []}, action) {
  console.log(state, action.type)
  switch(action.type) {
    case dropdownConstants.REQUEST_DROPDOWN_DATA:
      return { 
        ...state
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
      return {
        requestResolved: true,
        dropdownData: [
          ...state.dropdownData.map((content) => {
            if (content.id === action.id) {
              return {...content, ...{selectedIndex: action.index}}
            } else {
              return content
            }
          })
        ]
      }
      case dropdownConstants.UNSELECT_DROPDOWN:
      return {
        requestResolved: true,
        dropdownData: [
          ...state.dropdownData.map((content) => {
            if (content.id === action.id) {
              return {...content, ...{selectedIndex: null}}
            } else {
              return content
            }
          })
        ]
      }
      default: 
        return {...state}
  }
}