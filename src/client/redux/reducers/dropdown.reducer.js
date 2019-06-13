import {dropdownConstants} from '../constants'

export function dropdown(state = {dropdownQuery: [], dropdownData: {byId: [], byHash: {}}}, action) {
  switch(action.type) {
    case dropdownConstants.ADD_DROPDOWN_QUERY:
      return {
        dropdownQuery: [...state.dropdownQuery, {id: action.id, QueryObject: action.QueryObject, onSelectId: action.onSelectId}],
        dropdownData: {...state.dropdownData}
      }
    case dropdownConstants.SELECT_DROPDOWN_ITEM: 
      return {
        dropdownQuery: [...state.dropdownQuery],
        dropdownData: {...state.dropdownData, byId: [...state.dropdownData.byId.filter((id) => {
          return id !== action.id
        }), action.id], byHash: {...state.dropdownData.byHash, [action.id]: state.dropdownData.byHash[action.id] !== undefined ? [...state.dropdownData.byHash[action.id].filter((item) => {
          return item.ndbno !== action.item.ndbno
        }), action.item] : [action.item]}}
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