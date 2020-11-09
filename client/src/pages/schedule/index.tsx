import React from 'react'
import { View, } from '@tarojs/components'

import './index.scss'
import Taro from '@tarojs/taro'
import Plan from '@components/plan'
type Props = {
}
const Index:React.FC<Props> =(props)=>{
const {}  = props;
return (
<View className='schedule'>
<Plan></Plan>
</View>
)
 }
export default Index