export const userService = {
    login,
    logout
}
function login(username, password) {
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({username, password})
    }
    return fetch(`${process.env.API_URL}/user/login`, requestOptions)
        .then(handleResponse)
        .then((user) => {
            return user
        })
}

function logout () {
    const requestOptions = {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'}
    }
    return fetch(`${process.env.API_URL}/user/logout`, requestOptions)
            .then(handleResponse)
            .then((response) => {
                return response
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