import { userConstants } from '../constants'

export function authentication (state = {loggedIn: false, user: {}}, action) {
    switch (action.type) {
        case userConstants.LOGIN_REQUEST:
            return {
                loggingIn: true,
                user: action.user
            }
        case userConstants.LOGIN_SUCCESS:
            return {
                loggedIn: true,
                user: action.user
            }
        case userConstants.INITIAL_USER:
            return {
                loggedIn: action.loggedIn,
                user: action.user
            }  
        case userConstants.LOGIN_FAILURE:
            return {}
        case userConstants.LOGOUT:
            return {}
        default:
            return state
    }
}