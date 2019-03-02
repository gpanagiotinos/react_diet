import { userConstants } from '../constants'
import { userService } from '../../services'
// import {history} from '../helpers'
export const userActions = {
    login,
    logout,
    authenticatedUser
}

function login (username, password, history) {
    return dispatch => {
        console.log(history)
        dispatch(request({ username }))
        userService.login(username, password)
            .then((response) => {
                dispatch(success(response.user))
                history.push('/')
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
            type: userConstants.LOGIN_FAILURE, 
            error
        }
    }
}
function logout(history) {
    console.log('dispatch')
    return dispatch => {userService.logout().then(() => {
            dispatch(success())
            history.push('/login')
        }, (error) => {
            dispatch(success())
            history.push('/login')
        })
    }
    function success() {
        console.log('success')
        const logoutState = {loggedIn: false, user: {}}
        return {type: userConstants.LOGOUT, logoutState}
    } 
}
function authenticatedUser (user) {
    return dispatch => {
        if (user) {
            dispatch(success(user))
        } else {
            dispatch(failure('Unauthorized User'))
        }
    }
    function success(user) {
        return {
            type: userConstants.LOGIN_SUCCESS, 
            user
        }
    }
    function failure(error) {
        return {
            type: userConstants.LOGIN_FAILURE, 
            error
        }
    }
}