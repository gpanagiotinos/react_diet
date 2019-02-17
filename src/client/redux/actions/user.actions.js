import { userConstants } from '../constants'
import { userService } from '../../services'

export const userActions = {
    login
}

function login (username, password) {
    return dispatch => {
        dispatch(request({ username }))
        userService.login(username, password)
            .then((user) => {
                dispatch(success(user))
            }, (error) => {
                dispatch(failure(error.toString()))
            })
    }
    function request(user) {
        return {
            type: userConstants.LOGIN_REQUEST, 
            user
        }
    }
    function success(user) {
        return {
            type: userConstants.LOGIN_SUCCESS, 
            user
        }
    }
    function error(error) {
        return {
            type: userConstants.LOGIN_ERROR, 
            error
        }
    }
}