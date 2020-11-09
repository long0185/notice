import {createStore,applyMiddleware} from 'redux'
import logger from 'redux-logger'
import rootReducer from './reducers'
import {dateArrType} from './reducers/dateReducer'
import {listType} from './reducers/listReducer'
import {StorageType} from './reducers/storageReducer'
export type rootStateType = {
    date:dateArrType,
    todoList:listType,
    storage:StorageType
}
const store  = createStore(rootReducer)
export default store