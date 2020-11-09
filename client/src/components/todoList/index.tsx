import React, { FC, } from 'react'
import { View, Text, ScrollView } from '@tarojs/components'
import { AtButton } from 'taro-ui'
import Taro from '@tarojs/taro'
import { rootStateType } from '@store/index'

import './index.scss'
import { useSelector, useDispatch } from 'react-redux'
type Props = {
}

const Index: FC<Props> = (props) => {
    const { } = props;
    const state = useSelector((state: rootStateType) => state)
    const dispatch = useDispatch()
    const handleComplete = (id, date) => {
        dispatch({ type: 'change-complete', payload: { id, date, } })
    }
    const handleDelete = async (id, date) => {
        dispatch({ type: 'change-delete', payload: { id, date, } })
        const db = Taro.cloud.database();
        const messages = await db
            .collection('messages')
            // 查询条件这里做了简化，只查找了状态为未发送的消息
            // 在真正的生产环境，可以根据开课日期等条件筛选应该发送哪些消息
            .where({
                data: {
                    id
                }
            }).get()
        if(messages.data.length>0){
            const result = await db.collection('messages').doc(messages.data[0]._id as string).remove({})
        }

    }
    const handleShow = () => {
        const showDate = state.date.chooseDate.month + '/' + state.date.chooseDate.day;
        if (state.storage[showDate] && state.storage[showDate].length > 0) {
            return state.storage[showDate].map((item, index) => <View className='show-item'
                key={item.id}>
                <View className='first-view-item'><Text>{item.sth}</Text></View>
                <View><Text>{item.time}</Text></View>
                <View>{item.complete ? '已完成' : '未完成'}</View>
                <View className='btn'><AtButton disabled={item.complete} onClick={() => handleComplete(item.id, showDate)} type='primary' size='small'>完成</AtButton></View>
                <View className='btn' ><AtButton onClick={() => handleDelete(item.id, showDate)} type='primary' size='small'>删除</AtButton></View>

            </View>)
        } else {
            return <View className='no-todo'>暂无日程安排</View>
        }

    }
    return (
        <View className='todo-list'>
            <ScrollView onScroll={(e)=>{
               
            }}>
                <View>{handleShow()}</View>
                {(state.date.chooseDate.day >= state.date.day || state.date.chooseDate.month > state.date.month) && (<View className='add-list' onClick={() => {
                   Taro.navigateTo({
                        url: '/pages/addlist/index'
                    })
                }}>+</View>)}
            </ScrollView>
        </View>
    )
}
export default Index