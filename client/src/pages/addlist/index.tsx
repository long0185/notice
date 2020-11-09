import React, { FC, Component, useState, useReducer, useEffect } from 'react'
import { View, Picker, } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { useSelector, useDispatch } from 'react-redux'
import { AtForm, AtInput, AtButton, AtSwitch } from 'taro-ui'
import { rootStateType } from '../../store'
import *as storage from '../../utils/listStorage'
import useDebounce from '../../hooks/useDebounce'

import './index.scss'


type Props = {}
const Index: FC<Props> = (props) => {
    const state = useSelector((state: rootStateType) => state)
    const dispatch = useDispatch()
    const [val, setVal] = useState('')
    const [checkMsg, setCheckMsg] = useState(true)
    const [pickLock, setPickLock] = useState(true)
    const [switchVal, setSwitchVal] = useState(false)
    const [useYear, setUseYear] = useState(`${state.date.year}-${state.date.chooseDate.month < 10 ? '0' + state.date.chooseDate.month : state.date.chooseDate.month}-${state.date.chooseDate.day < 10 ? '0' + state.date.chooseDate.day : state.date.chooseDate.day}`)
    const [useTime, setUseTime] = useState(`${state.todoList.currentTime}`)
    useEffect(() => {
        let month = state.date.chooseDate.month,
            day = state.date.chooseDate.day;
        dispatch({ type: "change-date", payload: month + '/' + day })
    }, [state.date.chooseDate])
    useEffect(() => {
        if (val == '') {
            return
        }
        async function check() {
            const { result } = await Taro.cloud.callFunction({
                name: 'msgcheck',
                data: {
                    data: val
                }
            })
            if (!result || result == '内容不合法') {
                setVal('')
                Taro.showToast({
                    title: '内容不合法',
                    icon: 'none',
                    duration: 800,
                })
                setVal('')
            }
        }
        check()
    }, [val])

    function onSubmit() {
        if (!val || val === '') {
            return
        }
        const list = {
            id: new Date().getTime(),
            sth: val.trim().length > 10 ? val.trim().slice(0, 10) : val.trim(),
            time: state.todoList.currentTime,
            complete: false,
            isNotice: switchVal
        }
        dispatch({ type: "add", payload: { date: state.todoList.currentDate, list: [list] } })
        setVal('')
        setSwitchVal(false)
        Taro.showToast({
            title: '添加成功',
            icon: 'success',
            duration: 1000,
        }).then(() => setTimeout(() => {
            Taro.navigateBack()
        }, 1000))
        return list


    }
    function onReset() {

    }
    function handleChange(e) {
        setVal(it => e.trim())
        setPickLock(t => false)
    }

    return (
        <AtForm className='form'
            onSubmit={onSubmit}
            onReset={onReset}
        >
            {/* <View className="header">{`${state.date.year}-${state.date.chooseDate.month}-${state.date.chooseDate.day}`}</View> */}
            <AtInput
                // disabled={pickLock}
                maxlength={10}
                name='value'
                title=''
                type='text'
                placeholder='请输入待办事务(字数小于10)'
                value={val}
                onChange={useDebounce(handleChange, 300)}
            />
            <View className="time">
                <View >选择时间</View>
                <Picker mode='time'
                    disabled={pickLock}
                    onChange={(e) => {
                        const timeVal = e.detail.value.split(':')
                        const hour = timeVal[0].length > 1 ? timeVal[0] : '0' + timeVal[0]
                        const minutes = timeVal[1].length > 1 ? timeVal[1] : '0' + timeVal[1]
                        dispatch({ type: 'change-time', payload: e.detail.value })
                        setUseTime(hour + ':' + minutes)
                    }}
                    value={state.todoList.currentTime}
                    start={state.date.chooseDate.month >= new Date().getMonth() + 1 && state.date.chooseDate.day > new Date().getDate() ? '00:00' : state.todoList.currentTime}
                    end='24:00'
                >
                    <View className="picker">
                        当前选择：{state.todoList.currentTime.split(':')[0] + '时' + state.todoList.currentTime.split(':')[1] + '分'}
                    </View>
                </Picker>

            </View>
            <View className="date">
                <View >选择日期</View>
                <Picker mode='date'
                    disabled={pickLock}
                    onChange={(e) => {
                        const value = e.detail.value.split('-')
                        let year = value[0]
                        let month = value[1].length > 1 ? value[1] : '0' + value[1]
                        let date = value[2].length > 1 ? value[2] : '0' + value[1]
                        setUseYear(year + '-' + month + '-' + date)
                        dispatch({ type: 'change-choosedate-month', payload: +month })
                        dispatch({ type: 'change-choosedate-day', payload: +date })
                        dispatch({ type: 'change-time', payload: new Date(new Date().getTime()).toString().slice(16, 21) })
                    }}
                    value={`${state.date.year}-${state.date.chooseDate.month}-${state.date.chooseDate.day}`}
                    start={`${state.date.year}-${state.date.month}-${state.date.day}`}
                    end={`${state.date.year}-12-31`}
                >
                    <View className="picker">
                        当前选择：{`${state.date.year}-${state.date.chooseDate.month}-${state.date.chooseDate.day}`}
                    </View>
                </Picker>


            </View>
            <View className='notice'><AtSwitch disabled={pickLock} className='notice-item' title='是否添加并订阅提醒' checked={switchVal} onChange={(e) => {
                Taro.requestSubscribeMessage({
                    // 传入订阅消息的模板id，模板 id 可在小程序管理后台申请
                    tmplIds: ['uKrKAl0jiVcD32cu5BFkLxzz2typcOmWA8kEJhkNa0Q'],
                    success(res) {
                        if (res['uKrKAl0jiVcD32cu5BFkLxzz2typcOmWA8kEJhkNa0Q'] == 'accept') {
                            setPickLock(val => true)
                            if (res.errMsg === 'requestSubscribeMessage:ok') {
                                // 这里将订阅的课程信息调用云函数存入云开发数据
                                const list = onSubmit()
                                Taro.cloud
                                    .callFunction({
                                        name: 'subscribe',
                                        data: {
                                            data: { id: list?.id || '', time6: { value: `${useYear}` + ' ' + `${useTime}` }, thing2: { value: val }, complete: false, isNotice: false },
                                            templateId: 'uKrKAl0jiVcD32cu5BFkLxzz2typcOmWA8kEJhkNa0Q',
                                        },
                                    })
                                    .then(() => {

                                    })
                                    .catch((err) => {
                                        Taro.showToast({
                                            title: '订阅失败',
                                            icon: 'success',
                                            duration: 2000,
                                        });
                                    });
                            }
                        }
                        else {
                            setSwitchVal(val => true)
                            setTimeout(() => {
                                setSwitchVal(val => false)
                            }, 500)
                        }
                    },
                });

            }} /></View>
            <AtButton disabled={pickLock} type='primary' className='btn' onClick={onSubmit}>{"仅添加"}</AtButton>

        </AtForm>
    )
}
export default Index