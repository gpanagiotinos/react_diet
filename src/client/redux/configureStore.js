import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunkMiddleware from 'redux-thunk'
import {authentication, alert, alertInput, table, tableRow} from './reducers'
export default function configureStore(preloadedState) {
    console.log(preloadedState)
    const store = createStore(
        combineReducers({authentication, alert, alertInput, table, tableRow}),
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