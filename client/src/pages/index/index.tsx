import React, { FC, useEffect, useState } from 'react'
import Taro from '@tarojs/taro'
import { ScrollView, View, Text } from '@tarojs/components'
import Header from '@components/header'
import Section from '@components/section'
import useWeather from '../../hooks/useWeather'


import './index.scss'

type Props = {
}
const Index: FC<Props> = (props) => {
  const { weather } = useWeather();
  if (Object.keys(weather).length !== 0) {
    return (
      <View className="container">
        <Text> {weather.liveData.reporttime.slice(0,10)}</Text>
        <Text>{weather.city.text} : {weather.city.data}</Text>
        <Text>{weather.weather.text} : {weather.weather.data}</Text>
        <Text>{weather.temperature.text} : {weather.temperature.data}℃</Text>
        <Text>风速 : {weather.winddirection.data} {weather.windpower.data}</Text>
        <Text>{weather.humidity.text} : {weather.humidity.data}</Text>
      </View>

    )
  } else {
    return null
  }

}
export default Index