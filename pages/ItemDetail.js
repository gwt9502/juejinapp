import React, { Component } from 'react'
import { Text, StyleSheet, View, WebView, Image, TouchableOpacity, ScrollView, Animated, Easing } from 'react-native'
import { inject, observer } from 'mobx-react';
import axios from 'axios'

@inject('itemDetail', 'userInfo')
@observer
export default class ItemDetail extends Component {

  state = {
    webViewHeight: SCREEN_HEIGHT,
  }

  componentDidMount () {
    const { entryItem } = this.props.navigation.state.params
    // 兼容是否从用户中心过来
    this.props.itemDetail.getArticleData(entryItem.objectId)
    this.props.itemDetail.getCommentList(entryItem.objectId)
  }

  onMessage = (event) => {
    this.setState({webViewHeight: JSON.parse(event.nativeEvent.data).height + 30})
  }

  goUserInfo = (userId) => {
    this.props.navigation.navigate({routeName: 'UserInfo', params: {userId: userId}})
  }

  renderLoading = () => <View style={{paddingHorizontal: 15}}>
    <View style={{width: 200, height: 40, backgroundColor: '#eaeaea'}}></View>
    <Animated.View style={{width: this.state.viewWidth,backgroundColor: '#eaeaea', height: 20, marginTop: 10}}></Animated.View>
    <Animated.View style={{width: this.state.viewWidth,backgroundColor: '#eaeaea', height: 20, marginTop: 10}}></Animated.View>
    <View style={{ marginTop: 10}}><Text style={{textAlign: 'center'}}>加载中。。。</Text></View>
  </View>

  render() {

    const html = `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <style>
        code{word-break:break-word}
        a{text-decoration:none;color:#0269c8;border-bottom: 1px solid #d1e9ff}
        img{max-width: 100%}
        blockquote{border-left: 4px solid #cbcbcb;color: #666;margin: 22px 0;padding: 1px 23px;background: #f8f8f8}
      </style>
    </head>
    <body>
      ${this.props.itemDetail.articleData.content || '努力加载中...'}
    </body>

    </html>`

    const baseScript = `(function(){
      window.postMessage(JSON.stringify({
        type: 'setHeight',
        height: document.body.clientHeight,
      }))
    }())`

    const entryItem = this.props.navigation.state.params.entryItem
    return (
      <ScrollView style={{flex: 1, backgroundColor: '#fff'}}>
        {
          entryItem.screenshot && <Image source={{uri: entryItem.screenshot}} style={{width: SCREEN_WIDTH, height: SCREEN_WIDTH/3, backgroundColor: '#333'}} />
        }
        <View style={styles.userInfo}>
          <View style={{flexDirection: 'row',}}>
            <TouchableOpacity onPress={() => this.goUserInfo(entryItem.user.objectId)}>
              {
                entryItem.user.avatarLarge ? <Image source={{uri: entryItem.user.avatarLarge}} defaultSource={require('../img/default_avatar.png')} style={{width: 50, height: 50, borderRadius: 25}} /> : <Image source={require('../img/default_avatar.png')} style={{width: 50, height: 50, borderRadius: 25}} />
              }
            </TouchableOpacity>
            <View style={styles.userInfoRight}>
              <Text>{entryItem.user.username}</Text>
              <Text>{timeFilter(entryItem.createdAt)}<Text>&nbsp;&nbsp;阅读 {entryItem.viewsCount || 0}</Text></Text>
            </View>
          </View>
          <View><Text style={{color: '#333', fontSize: 20, marginTop: 13, fontWeight: '700'}}>{entryItem.title}</Text></View>
        </View>
        <WebView
        // onNavigationStateChange={(event) => {console.log(event)}}
        originWhitelist={['*']}
        scalesPageToFit
        domStorageEnabled
        javaScriptEnabled
        startInLoadingState={this.props.itemDetail.articleData.content == null ? true : false} // webview加载之前
        // renderLoading={this.renderLoading}
        scrollEnabled={false}
        onMessage={this.onMessage}
        style={{width: SCREEN_WIDTH, height: this.state.webViewHeight, flex: 1, marginBottom: 20 }}
        contentInset={{top: 0, left: 5, bottom: 0, right: 0}}
        injectedJavaScript={baseScript}
        source={{ html: html }}
        />
        {/* 评论 */}
        <View style={{height: 10, backgroundColor: '#F4F6F9'}}></View>
        {
          this.props.itemDetail.commentList.length > 0 && this.props.itemDetail.articleData.content != null ? <View style={styles.commentContainer}>
            <View style={{borderBottomWidth: 1,borderBottomColor: '#F4F6F9'}}><Text style={styles.headerTitle}>{this.props.itemDetail.commentList.length || 0}条评论</Text></View>
            {
              this.props.itemDetail.commentList.map((item, index) => <View key={index} style={styles.commentListItem}>
                <TouchableOpacity onPress={() => this.goUserInfo(item.userInfo.objectId)}>
                  {
                    item.userInfo.avatarLarge ? <Image source={{uri: item.userInfo.avatarLarge}} defaultSource={require('../img/default_avatar.png')} style={{width: 40, height: 40, borderRadius: 20, marginRight: 10}} /> : <Image source={require('../img/default_avatar.png')} style={{width: 40, height: 40, borderRadius: 20, marginRight: 10}} />
                  }
                </TouchableOpacity>
                <View style={styles.listRight}>
                  <Text style={{color: '#007fff'}}>{item.userInfo.username}</Text>
                  <Text style={{marginVertical: 10, lineHeight: 18}}>{item.content}</Text>
                  <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
                    <Image source={require('../img/zan_grey_feidian3.png')} style={{width: 16, height: 16}} /><Text>{item.likesCount || '赞'} · </Text><Text>{item.subCount || null}回复</Text><Text> · {timeFilter(item.createdAt)}</Text>
                  </View>
                </View>
              </View>)
            }
          </View> : <View style={styles.noCommentData}><Text>暂无评论</Text></View>
        }
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  userInfo: {
    paddingVertical: 10,
    paddingHorizontal: 15
  },
  userInfoRight: {
    paddingVertical: 4,
    marginLeft: 10,
    justifyContent: 'space-between'
  },
  commentContainer: {
    paddingHorizontal: 10
  },
  headerTitle: {
    height: 40,
    lineHeight: 40,
    fontSize: 16,
  },
  commentListItem: {
    flexDirection: 'row',
    minHeight: 100,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F4F6F9'
  },
  listRight: {
    flex: 1,
  },
  noCommentData: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
