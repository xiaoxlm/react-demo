import { combineReducers } from 'redux'
import entities from './entities'
import app from './app'
import detail from './detail'
import home from './home'
import search from "./search"

const rootReducer = combineReducers({
    entities,
    app,
    detail,
    home,
    search
})
export default rootReducer