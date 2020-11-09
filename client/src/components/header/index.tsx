import React, { FC } from 'react'
import { View, Text,ScrollView } from '@tarojs/components'
import EIcon from '@components/EIcon'

import './index.scss'
type Props = {
    city:string
}

const Index: FC<Props> = (props) => {
    const {city } = props;
    return (
        <View className='header'>
            <Text>{city}</Text>
            <EIcon type="2" black={true} size={16} color='#black'></EIcon>
           
        </View>
    )
}
export default Index