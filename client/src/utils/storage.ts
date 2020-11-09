import { todoType } from '../pages/schedule'
import Taro from '@tarojs/taro'
const LIST_KEY = 'list-key';
export function fetch() {

    let value = Taro.getStorageSync(LIST_KEY)
    if (value && value !== 'undefined') {
        value = JSON.parse(value)
        if (Array.isArray(value)) {
            return value
        }
        return [value]
    } else {
        return []
    }

}
export function save(list: todoType | todoType[]) {
    if (Array.isArray(list)) {
        try {
            Taro.setStorageSync(LIST_KEY, JSON.stringify(list))

        } catch (e) {
            console.log('缓存失败' + e)
        }
    } else {
        const data = fetch()
        data.unshift(list)
        try {
            Taro.setStorageSync(LIST_KEY, JSON.stringify(data))

        } catch (e) {
            console.log('缓存失败' + e)
        }
    }

}
export function remove() {
    Taro.removeStorageSync(LIST_KEY)
}