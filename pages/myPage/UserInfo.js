import React, { Component } from 'react'
import { Text, StyleSheet, View, ScrollView, Image, TouchableOpacity } from 'react-native'
import { observer, inject } from 'mobx-react';
import ItemTouchableOpacity from '../component/ItemTouchableOpacity'

@inject('my', 'userInfo')
@observer
export default class UserInfo extends Component {

  static navigationOptions = ({ navigation }) => ({
    title: '个人主页',
    headerRight: (
      <TouchableOpacity onPress={() => navigation.state.params.navigatePress()}>
        <Image source={require('../../img/ic_dynamic_vote.png')} style={{width: 30, height: 30, right: 10}} />
      </TouchableOpacity>
    ),
  })

  componentDidMount () {
    // 向navigation注入方法
    this.props.navigation.setParams({
      navigatePress:this.navigatePress
    })
    this.props.navigation.state.params && this.props.userInfo.getUserInfo(this.props.navigation.state.params.userId)
  }

  navigatePress = () => {
    const { params } = this.props.navigation.state
    const userMsg = params ? params.userId ? this.props.userInfo.userMsg : this.props.my.userMessage : this.props.my.userMessage
    this.props.navigation.navigate('Statistics', {userInfo: userMsg})
  }

  render() {
    const { params } = this.props.navigation.state
    const userMsg = params ? params.userId ? this.props.userInfo.userMsg : this.props.my.userMessage : this.props.my.userMessage
    return (
      <ScrollView style={{flex: 1}}>
        <View style={styles.infoHeader}>
          <View style={styles.userHeader}>
            {
              isLogin && userMsg.avatarLarge  ? <Image source={{uri: userMsg.avatarLarge}} defaultSource={require('../../img/empty_avatar_user.png')} style={styles.avatar} /> : <Image source={require('../../img/empty_avatar_user.png')} style={styles.avatar} />
            }
            <View style={styles.userInfoRight}>
              <Text style={{fontSize: 18, color: '#333'}}>{userMsg.username}</Text>
              <Text style={{color: '#999', fontSize: 12}}>
                {`${userMsg.jobTitle || ''} @ ${userMsg.company || ''}`}
              </Text>
            </View>
          </View>
          <View style={styles.infoBottom}>
            <View style={{marginRight: 50}}>
              <Text style={styles.follow}>{userMsg.followeesCount}</Text>
              <Text style={styles.followTitle}>关注</Text>
            </View>
            <View>
              <Text style={styles.follow}>{userMsg.followersCount}</Text>
              <Text style={styles.followTitle}>关注者</Text>
            </View>
          </View>
        </View>
        <ItemTouchableOpacity {...this.props.navigation} titleName="动态" routerName="Notice" style={{marginBottom: 10}} />
        <ItemTouchableOpacity {...this.props.navigation} titleName="沸点" val={userMsg.pinCount || 0} routerName="Notice"  />
        <ItemTouchableOpacity {...this.props.navigation} titleName="原创文章" val={userMsg.postedPostsCount || 0} routerName="Notice" />
        <ItemTouchableOpacity {...this.props.navigation} titleName="分享文章" val={userMsg.postedEntriesCount || 0} routerName="Notice" />
        <ItemTouchableOpacity {...this.props.navigation} titleName="收藏集" val={userMsg.collectionSetCount || 0} routerName="Notice" style={{marginBottom: 10}} />
        <ItemTouchableOpacity {...this.props.navigation} titleName="喜欢的文章" val={userMsg.collectedEntriesCount || 0} routerName="Notice" />
        <ItemTouchableOpacity {...this.props.navigation} titleName="关注的标签" val={userMsg.subscribedTagsCount || 0} routerName="Notice" />
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  infoHeader: {
    height: 135,
    backgroundColor: '#fff',
    paddingHorizontal: 20, 
    marginVertical: 10,
  },
  userHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 90
  },
  avatar: {
    width: 40,
    height: 40,
    marginRight: 10
  },
  userInfoRight: {
    height: 40,
    justifyContent: 'space-around'
  },
  infoBottom: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  follow: {
    fontSize: 14
  },
  followTitle: {
    fontSize: 12,
    color: '#abb4bf'
  }
})
