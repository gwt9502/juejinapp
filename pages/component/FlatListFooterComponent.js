import React, { Component } from 'react'
import { Text, View } from 'react-native'

export class FlatListFooterComponent extends Component {
  render() {
    const { isEnd } = this.props
    return (
      <Text style={{textAlign: 'center', padding: 10, transform: [{scale: 0.857143}], position: isEnd ? 'absolute' : 'relative', left: 0, right: 0, bottom: isEnd ? -30 : 0}}>{ isEnd ? '我是有底线的...' : '正在努力加载数据....'}</Text>
    )
  }
}

export default FlatListFooterComponent