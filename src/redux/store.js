// src/redux/store.js
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './modules'
import api from './middleware/api.js' // 引入中间件

let store

if (process.env.NODE_ENV !== "production" && window.__REDUX_DEVTOOLS_EXTENSION__) {
    // 开发环境
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk, api)))
} else {
    // 生产环境
    store = createStore(rootReducer, applyMiddleware(thunk, api))
}

export default store