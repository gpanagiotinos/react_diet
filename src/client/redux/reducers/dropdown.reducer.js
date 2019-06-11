import {dropdownConstants} from '../constants'

export function dropdown(state = {dropdownQuery: [], dropdownData: []}, action) {
  console.log(action, state)
  switch(action.type) {
    case dropdownConstants.ADD_DROPDOWN_QUERY:
      return {
        dropdownQuery: [...state.dropdownQuery, {id: action.id, QueryObject: action.QueryObject}],
        dropdownData: [...state.dropdownData]
      }
    case dropdownConstants.SELECT_DROPDOWN_ITEM: 
      return {
        dropdownQuery: [...state.dropdownQuery],
        dropdownData: [...state.dropdownData.filter((object) => {
          if (object.id !== action.id) {
            return object
          } else {
            return {...object, itemsArray: [...object.itemsArray.filter((item) => {
              return item.id !== action.item.id
            }), action.item]}
          }
        }), {id: action.id, itemsArray: [action.item]}]
      }
    default:
      return state
  }
}

// export function dropdown(state = {dropdownData: []}, action) {
//   switch(action.type) {
//     case dropdownConstants.REQUEST_DROPDOWN_DATA:
//       return { 
//         dropdownData: [
//           ...state.dropdownData.filter((content) => {
//             if (content.id !== action.id) {
//               return content
//             }
//           })
//         ]
//       }
//     case dropdownConstants.ADD_DROPDOWN_DATA:
//       return {
//         dropdownData:  [...state.dropdownData, {id: action.id, data: action.data, selectedIndex: action.selectedIndex, requestResolved: true}]
//       }
//       case dropdownConstants.FAILURE_DROPDOWN_DATA:
//       return {
//         dropdownData:  [...state]
//       }
//       case dropdownConstants.SELECT_DROPDOWN:
//       return {
//         dropdownData: [
//           ...state.dropdownData.map((content) => {
//             if (content.id === action.id) {
//               return {...content, ...{selectedIndex: action.index}}
//             } else {
//               return content
//             }
//           })
//         ]
//       }
//       case dropdownConstants.UNSELECT_DROPDOWN:
//       return {
//         dropdownData: [
//           ...state.dropdownData.map((content) => {
//             if (content.id === action.id) {
//               return {...content, ...{selectedIndex: null}}
//             } else {
//               return content
//             }
//           })
//         ]
//       }
//       default:
//         return state
//   }
// }