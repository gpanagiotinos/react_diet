import React from 'react'
import Logout from '../components/Logout.jsx'
import {connect} from 'react-redux'
import { alertActions } from '../redux/actions'
const checkError = (children, {graphQLErrors, networkError, operation, forward}, dispatch) => {
  if(graphQLErrors) {
    graphQLErrors.map(({message, locations, path}) => {
      dispatch(alertActions.error(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`))
      return children
    })
  }
  if (networkError.statusCode === 401) {
    return <Logout/>
  } else if (networkError) {
    dispatch(alertActions.error(`[Network error]: ${networkError}`))
    return children
  }
}

const GraphqlErrorHandler = (props) => {
  if (props.error) {return checkError(props.children, error, props.dispatch)}
  return props.children
}
function mapStateToProps (state, props) {
  return {}
}
export default connect(mapStateToProps)(GraphqlErrorHandler)