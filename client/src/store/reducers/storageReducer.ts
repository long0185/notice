import { AnyAction } from 'redux'
import { listType } from './listReducer'
import * as storage from '../../utils/listStorage'
import Taro from '@tarojs/taro'

type listArrType = {
    id: number,
    sth: string,
    time: string,
    complete: boolean,
    isNotice: boolean
}
export type StorageType = {
    [P: string]: listArrType[]
}

//     

// }
const intialState: StorageType = storage.fetch()


function reducer(state = intialState, action: AnyAction) {
    switch (action.type) {
        case 'add':
            storage.remove()
            if (Object.keys(state).includes(action.payload.date)) {
                const newState = {
                    [action.payload.date]: state[action.payload.date].concat(action.payload.list)
                }
                storage.save({ ...state, ...newState })
                return { ...state, ...newState }
            } else {
                const newState = {
                    [action.payload.date]: action.payload.list
                }
                storage.save({ ...state, ...newState })
                return { ...state, ...newState }
            }
        case 'change-complete':
            const newSate = state[action.payload.date]
            newSate.forEach((item) => {
                if (item.id === action.payload.id) {
                    item.complete = !item.complete
                }
            })
            storage.remove()
            storage.save({ ...state, [action.payload.date]: newSate })
            return { ...state, [action.payload.date]: newSate }
        case 'change-delete':
            for (const prop in state) {
                if(state[prop].length===0){
                    delete state[prop]
                }
            }
            let newState = state[action.payload.date]
            newState = newState.filter(item => item.id !== action.payload.id)
            storage.remove()
            storage.save({ ...state, [action.payload.date]: newState })
            return { ...state, [action.payload.date]: newState }
        default:
            return state
    }
}
export default reducer