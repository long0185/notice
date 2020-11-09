import React, { Component } from 'react'
import Taro, { Config } from '@tarojs/taro'
import { Provider } from 'react-redux'

import store from './store'

import './app.scss'


class App extends Component {

  componentDidMount() {
    if (process.env.TARO_ENV === 'weapp') {
      Taro.cloud.init()
    }
  } 

  componentDidShow() { }

  componentDidHide() { }

  componentDidCatchError() { }

  // this.props.children 是将要会渲染的页面
  render() {
    return (
    <Provider store={store}>{this.props.children}</Provider>        
    )
  }
}


export default App
