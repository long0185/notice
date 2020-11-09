import { todoType } from '../pages/schedule'
import { listType, listArrType } from '../store/reducers/listReducer'
import Taro from '@tarojs/taro'
const LIST_KEY = 'todo-list';
export function fetch(): listType['listStore'] {

    let value = Taro.getStorageSync(LIST_KEY)
    if (value && value !== 'undefined') {
        value = JSON.parse(value)
       return value 
    }else{
        return {}
    }
   

}
export function save(list: any) {
        try {
            Taro.setStorageSync(LIST_KEY, JSON.stringify(list))
        } catch (e) {
            console.log('缓存失败' + e)
        }
  

}
export function remove() {
    Taro.removeStorageSync(LIST_KEY)
}