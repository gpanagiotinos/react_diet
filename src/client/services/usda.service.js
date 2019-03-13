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

function handleUSDADataResponse (response) {
  const tableData = {
    head: USDADataTableHead(response.data.getUSDAData.list.item[0], ['group', 'name', 'ds', 'manu']),
    body: response.data.getUSDAData.list.item
  }
  return tableData
}

function USDADataTableHead (object, arrayVisibility = []) {
  if (arrayVisibility.length > 0) {
    return Object.keys(object).map((value) => {
      if (arrayVisibility.indexOf(value) > -1) {
        return {text: value, visible: true}
      } else {
        return {text: value, visible: false}
      }
    })
  } else {
    Object.keys(object).map((value) => {
      return {text: value, visible: true}
    })
  }
} 