import {menuConstants} from '../constants'

export function menu (state={menuContent: [
  {id: '255', name: 'Water', value: 0, measure: 'g'},
  {id: '208', name: 'Energy', value: 0, measure: 'kcal'},
  {id: '268', name: 'Energy', value: 0, measure: 'kj'},
  {id: '203', name: 'Protein', value: 0, measure: 'g'},
  {id: '204', name: 'Fat', value: 0, measure: 'g'},
  {id: '205', name: 'Cardohydrate', value: 0, measure: 'g'},
  {id: '291', name: 'Fiber', value: 0, measure: 'g'},
  {id: '269', name: 'Sugar', value: 0, measure: 'g'}
], items: []}, action) {
  switch(action.type) {
    case menuConstants.ADD_MENU_ITEM:
      return {
        menuItem: [
          ...state.menuItem.map((item) => {
            const valueSearch = action.content.find((object) => {
              return object.nutrient_id === item.id
            })
            const valueAdd = valueSearch !== undefined ? parseInt(valueSearch.value) : 0
            return {...item, value: item.value += valueAdd}
          })
        ],
        items: [...state.items, action.item]
      }
    case menuConstants.REMOVE_MENU_ITEM:
      return {
        menuItem
      }
    case menuConstants.INCREASE_MENU_ITEM:
      return {
        menuItem
      }
    default:
      return state
  }
}