import React, { Component } from 'react'
import { Text, StyleSheet, View, Image } from 'react-native'

export default class Statistics extends Component {

  static navigationOptions = ({ navigation }) => ({
    title: '文章数据统计',
  })

  render() {
    const userInfo = this.props.navigation.state.params.userInfo
    console.log(userInfo)
    return (
      <View style={{flex: 1, backgroundColor: '#fff', alignItems: 'center'}}>
        <View style={styles.userInfoView}>
          {
            userInfo.avatarLarge  ? <Image source={{uri: userInfo.avatarLarge}} defaultSource={require('../../img/empty_avatar_user.png')} style={styles.avatar} /> : <Image source={require('../../img/empty_avatar_user.png')} style={styles.avatar} />
          }
          <Text style={styles.userName}>{userInfo.username}</Text>
          <Text style={styles.footerText}>原创{userInfo.postedPostsCount}篇 · 分享{userInfo.postedEntriesCount}篇</Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.count}>{userInfo.totalCollectionsCount}</Text>
          <View style={styles.itemFooter}>
            <Image source={require('../../img/ic_collection.png')} style={styles.itemFooterImg} />
            <Text style={styles.itemFootertext}>获的收藏数</Text>
          </View>
        </View>
        <View style={styles.item}>
          <Text style={styles.count}>{userInfo.totalViewsCount}</Text>
          <View style={styles.itemFooter}>
            <Image source={require('../../img/ic_view.png')} style={styles.itemFooterImg} />
            <Text style={styles.itemFootertext}>获的阅读数</Text>
          </View>
        </View>
        <View style={styles.item}>
          <Text style={styles.count}>{userInfo.totalCommentsCount}</Text>
          <View style={styles.itemFooter}>
            <Image source={require('../../img/ic_dynamic_comment.png')} style={styles.itemFooterImg} />
            <Text style={styles.itemFootertext}>获的评论数</Text>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  userInfoView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 60
  },
  userName: {
    fontSize: 17,
    marginVertical: 8,
  },
  footerText: {
    color: '#333'
  },
  avatar: {
    width: 50,
    height: 50
  },
  itemFooterImg: {
    width: 13,
    height: 13,
    marginRight: 4
  },
  item: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 50
  },
  itemFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  itemFootertext: {
    color: '#999'
  },
  count: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 4
  }
})
