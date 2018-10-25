import React, { Component } from 'react'
import { Text, StyleSheet, View, ScrollView, TouchableOpacity, Switch } from 'react-native'
import { observer, inject } from 'mobx-react';

@inject('my')
@observer
export default class Set extends Component {

  render() {
    const userInfo = this.props.my.userMessage
    console.log(userInfo)
    return (
      <ScrollView>
        <ItemRender itemName="邮箱" value={userInfo.email || '未设置'} style={{marginTop: 10}} />
        <ItemRender itemName="手机号" value={userInfo.mobilePhoneNumber || '未设置'} />
        <ItemRender itemName="修改账户密码" lastItem />
        <ItemRender itemName="绑定新浪微博" showSwitch style={{marginTop: 10}} />
        <ItemRender itemName="绑定微信" showSwitch />
        <ItemRender itemName="绑定Github" showSwitch lastItem />
        <ItemRender itemName="清楚缓存" value="0" style={{marginTop: 10}} />
        <ItemRender itemName="推送消息设置" />
        <ItemRender itemName="移动网络下首页不显示图片" showSwitch />
        <ItemRender itemName="自动检查粘贴板快速分享" showSwitch lastItem />   
        <ItemRender itemName="关于" style={{marginTop: 10}} lastItem {...this.props} />
        <ItemRender itemName="退出登录" style={{marginTop: 10}} lastItem logOut {...this.props}/>
        <View style={{marginVertical: 10}}><Text style={{color: '#666', textAlign: 'center'}}>掘金 · juejin.im</Text></View>
      </ScrollView>
    )
  }
}

class ItemRender extends Component {

  operateSet = (props) => {
    switch (props.itemName) {
      case '退出登录':
        global.logOut(props.navigation)
        break;
      case '关于':
        props.navigation.navigate('About')
        break;
      default:
        break;
    }
  }

  render () {
    const { itemName, showSwitch, value, style, lastItem, logOut } = this.props
    return (
      <TouchableOpacity activeOpacity={0.5} style={[styles.itemRender, {borderBottomWidth: this.props.lastItem ? 0 : 1, justifyContent: logOut ? 'center' : 'space-between' }, {...style}]} onPress={() => this.operateSet(this.props)}>
        <Text style={{color: logOut ? 'rgb(201, 40, 15)' : null}}>{itemName}</Text>
        {
          showSwitch ? <Switch value={false} /> : <Text>{value}</Text>
        }
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  itemRender: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 45,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    borderBottomColor: '#efefef',
  }
})
