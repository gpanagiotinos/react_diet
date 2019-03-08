import {config} from '../config'
import {apollo} from './apollo.service.js'
export const usdaService = {
  search
}

function search(text, offset) {
  return apollo.apolloQuery(text, offset)
    .then(handleUSDADataResponse)
    .then((data) => {
      return data
    })
}

function handleUSDADataResponse (data) {
  console.log(data)
  return data
}