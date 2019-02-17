import {config} from '../config'
export const userService = {
    login
}

function login(username, password) {
    console.log(config)
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({username, password})
    }
    return fetch(`${config.apiUrl}/user/login`, requestOptions)
        .then(handleResponse)
        .then((user) => {
            return user
        })
}

function handleResponse(response) {
    return response.text().then((text) => {
        const data = text && JSON.parse(text)
        if (!response.ok) {
            if (response.status === 401) {
                console.log(response.status)
            }
            const error = (data && data.message) || response.statusText
            return Promise.reject(error)
        }
        return data
    })
}