import {alertConstants} from '../constants'

export const alertActions = {
    success,
    error,
    clear,
    successInput,
    errorInput,
    clearInput
}

function success(message) {
    return {type: alertConstants.SUCCESS, message}
}

function error (message) {
    return {type: alertConstants.ERROR, message}
}

function clear () {
    return {type: alertConstants.CLEAR}
}
function successInput(message, input) {
    return {type: alertConstants.SUCCESS_INPUT, message, input}
}

function errorInput (message, input) {
    return {type: alertConstants.ERROR_INPUT, message, input}
}

function clearInput (input) {
    return {type: alertConstants.CLEAR_INPUT, input}
}