import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunkMiddleware from 'redux-thunk'
import {authentication} from './reducers'
export default function configureStore(preloadedState) {
    const initialState = (state = {...preloadedState}, action) => state
    return createStore(
        combineReducers({authentication, initialState}),
        applyMiddleware(
            thunkMiddleware
        )
    )
}