import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunkMiddleware from 'redux-thunk'
import {authentication, alert, alertInput, table, tableRow, pagination, dropdown} from './reducers'
export default function configureStore(preloadedState) {
    const store = createStore(
        combineReducers({authentication, alert, alertInput, table, tableRow, pagination, dropdown}),
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