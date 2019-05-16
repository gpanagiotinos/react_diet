import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunkMiddleware from 'redux-thunk'
import {authentication, alert, alertInput, table, tableRow, pagination, dropdown, mediaObject, menu} from './reducers'
export default function configureStore(preloadedState = {loggedIn: false, user: null}) {
    const store = createStore(
        combineReducers({authentication, alert, alertInput, table, tableRow, pagination, dropdown, mediaObject, menu}),
        applyMiddleware(
            thunkMiddleware
        )
    )
    store.dispatch({
        type: 'INITIAL_USER',
        loggedIn: preloadedState.loggedIn,
        user: preloadedState.user
    })
    return store
}