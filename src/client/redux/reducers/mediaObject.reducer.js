import {mediaObjectConstants} from '../constants'

export function mediaObject (state = {mediaObjectArray: []}, action) {
  switch(action.type) {
    case mediaObjectConstants.REQUEST_MEDIAOBJECT:
      return {
        mediaObjectArray: [
          ...state.mediaObjectArray.filter((object) => {
            if (object.id !== action.id) {
              return object
            }
          })
        ]
      }
    case mediaObjectConstants.ADD_MEDIAOBJECT:
      return {
        mediaObjectArray: [
          ...state.mediaObjectArray,
          {id: action.id, title: action.title, subtitle: action.subtitle, content: action.content, requestResolved: true}
        ]
      }
    case mediaObjectConstants.REMOVE_MEDIAOBJECT:
      return {
        mediaObjectArray: [...state.mediaObjectArray.filter((object) => {
          return object.id !== action.id
        })]
      }
      default:
        return state
  }
}