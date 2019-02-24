import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunkMiddleware from 'redux-thunk'
import {authentication} from './reducers'

export default function configureStore(preloadedState) {
    return createStore(
        combineReducers({preloadedState, authentication}),
        applyMiddleware(
            thunkMiddleware
        )
    )
}