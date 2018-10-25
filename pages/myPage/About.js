import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'

export default class About extends Component {
  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center'}}>
        <Text> JUEJINAPP </Text>
        <Text> 喜欢的话点个赞吧😍 </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({})
