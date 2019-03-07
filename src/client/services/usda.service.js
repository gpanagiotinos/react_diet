import {config} from '../config'

export const usdaService = {
  search
}

function search(text) {
  graphQl(text)
    .then(handleResponse)
    .then((data) => {
        console.log(data)
        return data
    })
}

function graphQl (text) {
  console.log(text)
  const requestOptions = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      query: `query{getUSDAData(text: "${text}") {list { item {name}}}}`
    })
  }
  return fetch(`${config.apiUrl}/graphql`, requestOptions)
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