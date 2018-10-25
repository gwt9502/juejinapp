import React, { Component } from 'react'
import { Text, StyleSheet, View, ScrollView, Image, TouchableOpacity, TouchableHighlight } from 'react-native'
import { observer, inject } from 'mobx-react';
import ItemTouchableOpacity from './component/ItemTouchableOpacity'

@inject('my')

@observer
export default class My extends Component {

  componentDidMount () {
    this.props.navigation.addListener('willFocus', payload => {
      this.myViewInit()
    })
  }

  myViewInit = () => {
    this.props.my.getUserNotificationNum()
    this.props.my.getUserInfo()
  }

  goUserInfo = () => {
    this.props.navigation.push(isLogin ? 'UserInfo' : 'Login')
  }

  render() {
    const userMsg = this.props.my.userMessage
    return (
      <ScrollView style={styles.myView}>
        <View style={styles.userInfo}>
          <TouchableOpacity onPress={() => this.goUserInfo()}>
            <View style={styles.userHeader}>
              {
                isLogin && userMsg.avatarLarge  ? <Image source={{uri: userMsg.avatarLarge}} defaultSource={require('../img/empty_avatar_user.png')} style={styles.avatar} /> : <Image source={require('../img/empty_avatar_user.png')} style={styles.avatar} />
              }
              <View style={styles.userInfoRight}>
                <Text style={{fontSize: 18, color: '#333'}}>{isLogin ? userMsg.username || '' : '登录/注册'}</Text>
                <Text style={{color: '#999', fontSize: 12}}>
                  {(isLogin || userMsg.company) ? `${userMsg.jobTitle || ''} @ ${userMsg.company || ''}` : '添加职位 @ 添加公司'}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.itemContainer}>
          <ItemTouchableOpacity imgUrl={require('../img/ic_notification.png')} {...this.props.navigation} titleName="消息中心" val={(isLogin && this.props.my.userNotificationNum != 0) && this.props.my.userNotificationNum} routerName="Notice" />
          <ItemTouchableOpacity imgUrl={require('../img/ic_heart_entry_bottom_full.png')} {...this.props.navigation} titleName="我喜欢的" val={`${isLogin ? userMsg.collectedEntriesCount || 0 : 0}篇`} routerName="Like" />
          <ItemTouchableOpacity imgUrl={require('../img/ic_collection_set.png')} {...this.props.navigation} titleName="收藏集" val={`${isLogin ? userMsg.collectionSetCount || 0 : 0}个`} routerName="Collect" />
          <ItemTouchableOpacity imgUrl={require('../img/user_buy.png')} {...this.props.navigation} titleName="已购小册" val={`${isLogin ? userMsg.purchasedBookletCount || 0 : 0}本`} routerName="Purchased"  />
          <ItemTouchableOpacity imgUrl={require('../img/user_liked_pin.png')} {...this.props.navigation} titleName="赞过沸点" val={`${isLogin ? userMsg.likedPinCount || 0 : 0}个`} routerName="Praise" />
          <ItemTouchableOpacity imgUrl={require('../img/view.png')} {...this.props.navigation} titleName="阅读过的文章" val={`${isLogin ? userMsg.viewedEntriesCount || 0 : 0}篇`} routerName="HasRead" />
          <ItemTouchableOpacity imgUrl={require('../img/tag.png')} {...this.props.navigation} titleName="标签管理" val={`${isLogin ? userMsg.subscribedTagsCount || 0 : 0}个`} routerName="Label" lastItem />
        </View>
        <View style={{marginVertical: 10}}>
          <ItemTouchableOpacity imgUrl={require('../img/icon_feed_back.png')} {...this.props.navigation} titleName="意见反馈" val routerName="Suggest" />
          <ItemTouchableOpacity imgUrl={require('../img/settings.png')} {...this.props.navigation} titleName="设置" lastItem val routerName="Set" />
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  myView: {
    flex: 1
  },
  userInfo: {

  },
  userHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginVertical: 10,
    height: 90,
    backgroundColor: '#fff'
  },
  userInfoRight: {
    height: 40,
    justifyContent: 'space-around'
  },
  avatar: {
    width: 40,
    height: 40,
    marginRight: 10
  }
})
