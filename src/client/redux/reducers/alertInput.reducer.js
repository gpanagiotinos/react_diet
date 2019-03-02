import { alertConstants } from '../constants/alert.constants.js'

export function alertInput(state = [], action) {
    switch (action.type) {
        case alertConstants.SUCCESS_INPUT:
        return [...state, {
            type: 'is-success',
            message: action.message,
            input: action.input
        }]   
        case alertConstants.ERROR_INPUT:
            return [...state, {
                type: 'is-danger',
                message: action.message,
                input: action.input
            }]
        case alertConstants.CLEAR_INPUT:
            return [...state.filter((object) => {
                return object.input !== action.input
            })]
        default:
            return state
    }
}