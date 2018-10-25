import React, { Component } from 'react'
import { Text, View, Image } from 'react-native'
import itemStyle from '../styles/itemStyle'

export default class EmptyComponent extends Component {

  state = {
    emptyDataLength: [1,2,3,4]
  }

  render() {

    const { showItemHeader } = this.props

    return (
      this.state.emptyDataLength.map((item, index) => <View key={index}>
        <View style={itemStyle.itemContainer}>
          {
            showItemHeader && <View style={itemStyle.itemHeader}>
              <View style={itemStyle.itemUserInfo}>
                <View style={{width: 20, height: 20, borderRadius: 10, backgroundColor: '#eaeaea'}}></View>
                <View style={{backgroundColor: '#eaeaea', height: 20, width: 50, marginLeft: 10}}></View>
              </View>
            </View>
          }
          <View style={[itemStyle.itemContent, {marginTop: showItemHeader ? 0 : 15, marginBottom: showItemHeader ? 0 : 15}]}>
            <View style={{flex: 1, flexDirection: showItemHeader ? 'column' : 'row'}}>
              <View>
                <View style={{height: 20, width: showItemHeader ? 100 : SCREEN_WIDTH - 115, backgroundColor: '#eaeaea', marginBottom: 5}}></View>      
                {
                  showItemHeader ? <View><View style={{backgroundColor: '#eaeaea', height: 12, marginBottom: 5}}></View>
                  <View style={{backgroundColor: '#eaeaea', height: 12}}></View></View> : <View style={{backgroundColor: '#eaeaea', height: 12, width: 100}}></View>
                }
              </View>
              {
                !showItemHeader && <View style={{backgroundColor: '#eaeaea', width: 75, height: 75, marginLeft: 10}}></View>
              }
            </View>
          </View>
          {
            showItemHeader && <View style={itemStyle.itemFooter}>
              <View style={itemStyle.label}>
                <Image source={require('../../img/ic_dynamic_collect.png')} style={itemStyle.labelImage} />
                <View style={{backgroundColor: '#eaeaea', height: 15, width: 15, marginLeft: 10}}></View>
              </View>
              <View style={itemStyle.label}>
                <Image source={require('../../img/ic_dynamic_comment.png')} style={itemStyle.labelImage} />
                <View style={{backgroundColor: '#eaeaea', height: 15, width: 15, marginLeft: 10}}></View>
              </View>
            </View>
          }
        </View>
        {
          index != this.state.emptyDataLength.length - 1 ? <View style={{height: showItemHeader ? 10 : 1, backgroundColor: '#F4F6F9', paddingHorizontal: 0}}></View> : null
        }
      </View>
      )
    )
  }
}