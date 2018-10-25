import React, { Component } from 'react'
import { Text, StyleSheet, View, TouchableOpacity, Image } from 'react-native'

export default class ItemTouchableOpacity extends Component {
  goNavigate = (routerName) => this.props.push(isLogin ? routerName : 'Login')

  render () {
    return (
      <TouchableOpacity activeOpacity={0.5} style={[styles.itemTouchableOpacity, {borderBottomWidth: this.props.lastItem ? 0 : 1 }, {...this.props.style}]} onPress={() => this.goNavigate(this.props.routerName)}>
        <View style={styles.itemLeft}>
          {
            this.props.imgUrl && <Image source={this.props.imgUrl} style={styles.itemLeftImg} />
          }
          <Text>{this.props.titleName}</Text>
        </View>
        <View style={styles.itemRight}>
          <Text style={{color: '#abb4bf', fontSize: 14}}>{this.props.val}</Text>
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  itemTouchableOpacity: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 45,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    borderColor: '#efefef'
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemLeftImg: {
    width: 20,
    height: 20,
    marginRight: 10
  }
})
