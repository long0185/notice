import {combineReducers} from 'redux'
import dateReducer from './dateReducer'
import listReducer from './listReducer'
import storageReducer from './storageReducer'
export default combineReducers({
    date:dateReducer,
    todoList:listReducer,
    storage:storageReducer
})