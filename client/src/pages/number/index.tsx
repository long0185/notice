import React, { FC } from 'react'
import { View, Text,Input } from '@tarojs/components'
import './index.scss'
type Props = {
}
const Index: FC<Props> = (props) => {
    const { } = props;
    return (
        <View className='number'>
            <View className='item'><Text>开始:</Text><Input type="text" /></View>
            <View className='item'><Text>结束:</Text><Input type="text" /></View>
            <View className='item'><Text>数量:</Text><Input type="text" /></View>
        </View>
    )
}
export default Index