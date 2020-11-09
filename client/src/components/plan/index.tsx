import React, { FC, useMemo } from 'react'
import { View, Text, ScrollView } from '@tarojs/components'
import TodoList from '@components/todoList'
import { useDispatch, useSelector } from 'react-redux'
import { rootStateType } from '../../store'
import Taro from '@tarojs/taro'

import './index.scss'


const Index: FC<Props> = (props) => {
    const state = useSelector((state: rootStateType) => state.date)
    const dispatch = useDispatch()
    const days = useMemo(()=>{
       return new Date(state.year, state.month, 0).getDate();
    },[state.year,state.month])
    const changeMonth = (m: number) => {
        dispatch({ type: 'change-month', payload: m })
        dispatch({ type: 'change-choosedate-month', payload: m })
    }
    const changeCurrentDay = (i: number) => {
        dispatch({ type: 'change-choosedate-day', payload: i })
    }
    const { } = props;
    return (
        <View className='plan'>
            <View className='header'>
                <Text style={{
                    color: 'rgb(151, 151, 250)',
                    fontSize: 30
                }}
                    onClick={() => {
                        if (state.month == 1) {
                            dispatch({ type: 'change-month', payload: 12 })
                            dispatch({ type: 'change-year', payload: state.year - 1 })
                            return
                        }
                        changeMonth(state.month - 1)
                    }}
                >&nbsp;&nbsp;&lt;&nbsp;&nbsp;</Text>
                <Text style={{
                    color: 'rgb(151, 151, 250)',
                    fontSize: 30
                }}>{state.year}年{state.month}月</Text>
                <Text
                    style={{
                        color: 'rgb(151, 151, 250)',
                        fontSize: 30
                    }}
                    onClick={() => {
                        if (state.month == 12) {
                            dispatch({ type: 'change-month', payload: 1 })
                            dispatch({ type: 'change-year', payload: state.year + 1 })
                            return
                        }
                        changeMonth(state.month + 1)
                    }}
                >&nbsp;&nbsp;&gt;&nbsp;&nbsp;</Text>

            </View>
            <ScrollView className='scroll' scrollX paging-enabled scrollIntoView={`v${state.day - 4}`}
            >
                <View className='scroll-item'>
                    {days && (
                        new Array(days).fill(days).map((item, index) => {
                            return (
                                <View
                                    onClick={() => {
                                        changeCurrentDay(index + 1)
                                    }}
                                    id={'v' + index.toString()}
                                    className={state.day === index + 1 && state.month === new Date().getMonth() + 1 ? 'date-item active' : 'date-item'}
                                    key={index}

                                ><Text
                                    className={state.chooseDate.day == index + 1 ? 'text-active' : ''}

                                >{index + 1}</Text></View>
                            )
                        })
                    )}
                </View>

            </ScrollView>
            <TodoList></TodoList>
        </View>
    )
}
export default Index