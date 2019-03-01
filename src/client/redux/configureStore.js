import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunkMiddleware from 'redux-thunk'
import {authentication} from './reducers'
export default function configureStore(preloadedState) {
    const authentication = (state = authentication(state = {...preloadedState}, {})) => state
    return createStore(
        combineReducers({authentication}),
        applyMiddleware(
            thunkMiddleware
        )
    )
}