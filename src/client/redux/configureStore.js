import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunkMiddleware from 'redux-thunk'
import {authentication, alert, alertInput, table} from './reducers'
export default function configureStore(preloadedState) {
    
    const store = createStore(
        combineReducers({authentication, alert, alertInput, table}),
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