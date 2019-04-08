import {tableConstants, alertConstants, dropdownConstants, mediaObjectConstants} from '../constants'
import {usdaService} from '../../services'
import {paginationActions, menuActions} from '../actions'
export const usdaActions = {
  usdaSearch,
  usdaListDropDown,
  usdaNutritionAction,
  usdaNutritionMediaObject
}
// Basic Nutrition: Water, Energy(Kcal, Kj), Protein, Fat, Carbohydrate, Fiber, Sugar
const NutritionArray = ['255', '208', '268', '203', '204', '205', '291', '269']
function usdaSearch (text, foodGroup, offset) {
  return dispatch => {
    dispatch(request({text, foodGroup, offset}))
    usdaService.search(text, foodGroup, offset).then((data) => {
      dispatch(success(data.tableData))
      dispatch(pagination(data.paginationData, {text, offset}))
    }, (error) => {
      dispatch(failureAlert(error))
    })
  }
  function request(data) {
    return {
      type: tableConstants.REQUEST_TABLE_DATA,
      data
    }
  }
  function success(data) {
    return {
      type: tableConstants.ADD_TABLE_DATA,
      data
    }
  }
  function failureAlert(error) {
    return {
        type: alertConstants.ERROR,
        message: error.message
    }
  }
  function pagination(data, args) {
    const intOffset = parseInt(args.offset)
    const intLimit = (parseInt(args.offset) + parseInt(data.limit))
    const currentPagination = (intLimit/(intLimit-intOffset))
    return dispatch => {
      dispatch(paginationActions.addPaginationData(intOffset, intLimit, parseInt(data.total), usdaActions.usdaSearch, args, currentPagination))
    }
  }
}
function usdaListDropDown (listType, id, index, text, foodGroup) {
  return dispatch => {
    dispatch(request(id))
    switch (listType) {
      case 'groups':
        usdaService.foodGroupList()
        .then((data) => {
          dispatch(success(id, data, index))
        }, (error) => {
          dispatch(failure())
          dispatch(failureAlert(error))
        })
        break
        case 'searchFood':
          dispatch(request(id))
          usdaService.foodSearchList(text, foodGroup)
          .then((data) => {
            dispatch(success(id, data, index))
          }, (error) => {
            dispatch(failure())
            dispatch(failureAlert(error))
          })
        break
    }
  }
  function request(id) {
    return {
      type: dropdownConstants.REQUEST_DROPDOWN_DATA, id
    }
  }
  function success(id, data, index) {
    return {
      type: dropdownConstants.ADD_DROPDOWN_DATA,
      id, data, index
    }
  }
  function failure(data = {}) {
    return {
      type: dropdownConstants.FAILURE_DROPDOWN_DATA,
      data
    }
  }
  function failureAlert(error) {
    return {
        type: alertConstants.ERROR,
        message: error.message
    }
  }
}
function usdaNutritionAction(ndbno, service) {
  return dispatch => {
    dispatch(request({ndbno}))
    usdaService.availableServiceMethods[service](ndbno).then((data) => {
      dispatch(success(data))
    }, (error) => {
      dispatch(failureAlert(error))
    })
  }
  function request(data) {
    return {
      type: tableConstants.REQUEST_ROW_DATA,
      data
    }
  }
  function success(data) {
    return {
      type: tableConstants.ADD_ROW_DATA,
      data
    }
  }
  function failureAlert(error) {
    return {
      type: alertConstants.ERROR,
      message: error.message
  }
  }
}

function usdaNutritionMediaObject(ndbno) {
  return dispatch => {
    dispatch(request(ndbno))
    usdaService.availableServiceMethods['showNutrition'](ndbno).then((response) => {
      const dataNutrition = {
        id: response.rowID,
        title: response.data.desc.name,
        subtitle: ' @' + response.data.desc.sd,
        content: response.data.nutrients.filter((nutrition) => {
          return NutritionArray.indexOf(nutrition.nutrient_id) > -1
        })
      }
      dispatch(success(dataNutrition))
      dispatch(menuActions.addMenuItem(dataNutrition.content, {id: dataNutrition.id, value: 100}))
    }, (error) => {
      dispatch(failureAlert(error))
    })
  }
  function request(id) {
    return {
      type: mediaObjectConstants.REQUEST_MEDIAOBJECT,
      id
    }
  }
  function success({id, title, subtitle, content}) {
    return {
      type: mediaObjectConstants.ADD_MEDIAOBJECT,
      id, title, subtitle, content
    }
  }
  function failureAlert(error) {
    return {
      type: alertConstants.ERROR,
      message: error.message
  }
  }
}