import React, { Component } from 'react'
import { Text, StyleSheet, View, FlatList, ScrollView, TouchableOpacity, Image } from 'react-native'
import { SegmentedView } from 'teaset'
import FlatListFooterComponent from '../component/FlatListFooterComponent';
import { observer, inject } from 'mobx-react';

@inject('notice')
@observer
export default class Notice extends Component {

  static navigationOptions = ({ navigation }) => ({
    title: '消息中心'
  })

  componentDidMount () {
    this.getUserNoticeLists()
  }

  getUserNoticeLists = () => {
    !this.props.notice.empty && this.props.notice.getUserNotice()
  }

  componentWillUnmount () {
    this.props.notice.empty = false
    this.props.notice.userNoticeLists = []
  }

  goItemDetail = (item) => {
    // 兼容跳转到详情页
    item.user = item.users[0]
    item.objectId = item.entry.objectId
    item.title = item.entry.title
    item.screenshot = item.entry.screenshotUrl
    item.createdAt = item.users[0].createdAt
    item.viewsCount = item.users[0].totalViewsCount
    this.props.navigation.navigate({routeName: 'ItemDetail', params: {entryItem: item}, key: item.objectId})
  }

  goUserInfo = (item) => {
    this.props.navigation.navigate({routeName: 'UserInfo', params: {userId: item.users[0].objectId}})
  }

  filterItemType = (item) => {
    switch (item.category) {
      case 'collection':
        return <View style={styles.rightContent}><Text style={styles.itemTitle}>{item.users[0].username}等{item.count}人 喜欢了你的文章 <Text style={styles.goItemDetail} onPress={() => this.goItemDetail(item)} numberOfLines={2} ellipsizeMode="tail">{item.entry && item.entry.title}</Text></Text></View>
        break;
      case 'comment':
        return <View style={styles.rightContent}><Text style={styles.itemTitle}>{item.users[0].username}回复了你在文章 <Text style={styles.goItemDetail} onPress={() => this.goItemDetail(item)} numberOfLines={2} ellipsizeMode="tail">{item.entry && item.entry.title}</Text>的评论:</Text>
          <Text style={styles.commentReply} numberOfLines={2} ellipsizeMode="tail">{(item.reply && item.reply.content) || (item.comment && item.comment.content)}</Text>
        </View>
      case 'follow':
        return <View style={styles.rightContent}><Text style={styles.itemTitle}>{item.users[0].username} 关注了你</Text><Text style={styles.goItemDetail} onPress={() => this.goItemDetail(item)} numberOfLines={2} ellipsizeMode="tail">{item.users[0] && item.users[0].jobTitle}</Text></View>
      case 'comment-like':
        return <View style={styles.rightContent}><Text style={styles.itemTitle}>{item.users[0].username} 赞了你在 <Text style={styles.goItemDetail} onPress={() => this.goItemDetail(item)} numberOfLines={2} ellipsizeMode="tail">{item.entry && item.entry.title}</Text>的评论</Text></View>
      case 'pin-like':
        return <View style={styles.rightContent}><Text style={styles.itemTitle}>{item.users[0].username} 赞了你的沸点</Text></View>
      case 'pin-comment':
        return <View style={styles.rightContent}><Text style={styles.itemTitle}>{item.users[0].username} 回复了你的 <Text style={styles.goItemDetail} onPress={() => this.goItemDetail(item)} numberOfLines={2} ellipsizeMode="tail">沸点</Text></Text>
          <Text style={styles.commentReply} numberOfLines={2} ellipsizeMode="tail">{item.reply && item.reply.content || item.pinComment && item.pinComment.content}</Text>
        </View> 
      default:
        break;
    }
  }

  renderUserNoticeItem = ({item, index}) => <View key={index} style={styles.item}>
    <TouchableOpacity style={styles.itemLeft} onPress={() => this.goUserInfo(item)}>
      {
        item.users[0].avatarLarge ? <Image source={{uri: item.users[0].avatarLarge}} defaultSource={require('../../img/default_avatar.png')} style={styles.itemLeftImage} /> : <Image source={require('../../img/default_avatar.png')} style={styles.itemLeftImage} />
      }
    </TouchableOpacity>
    <View style={styles.itemRight}>
      {this.filterItemType(item)}
      <Text style={{marginTop: 5}}>{timeFilter(item.updatedAtString)}</Text>
    </View>
  </View>

  render() {
    const { empty, userNoticeLists } = this.props.notice
    return (
      <SegmentedView barStyle={{height: 45, backgroundColor: '#3281ff'}} style={{flex: 1}} type='carousel' indicatorLineColor="#fff" indicatorType="boxWidth">
        <SegmentedView.Sheet title='用户消息' titleStyle={{color: 'rgba(255,255,255,0.5)'}} activeTitleStyle={{color: '#fff'}}>
          <FlatList 
            style={{flex: 1, backgroundColor: '#fff'}}
            data={userNoticeLists}
            renderItem={this.renderUserNoticeItem}
            keyExtractor={(item, index) => index.toString()}
            onEndReachedThreshold={0.1}
            onEndReached={this.getUserNoticeLists}
            ListFooterComponent={() => !empty && <FlatListFooterComponent isEnd={empty} />}
          />
        </SegmentedView.Sheet>
        <SegmentedView.Sheet title='系统消息'  titleStyle={{color: 'rgba(255,255,255,0.5)'}} activeTitleStyle={{color: '#fff'}}>
          {/* <FlatList 
          style={styles.labelContainer}
          data={this.props.label.allTaglists}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => index.toString()}
          ListHeaderComponent={this.renderListHeader}
          refreshing={this.props.label.loading}
          onEndReachedThreshold={0.1}
          onEndReached={this.loadMore}
          ListFooterComponent={() => <FlatListFooterComponent isEnd={this.props.label.isEnd} />}
          /> */}
        </SegmentedView.Sheet>
      </SegmentedView>
    )
  }
}

const styles = StyleSheet.create({
  item: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    flexDirection: 'row',
    minHeight: 50,
    borderBottomWidth: 1,
    borderBottomColor: '#efefef'
  },
  itemLeftImage: {
    width: 40,
    height: 40,
    borderRadius: 3,
    marginRight: 10
  },
  commentReply: {
    marginTop: 5
  },
  itemRight: {
    flex: 1
  },
  goItemDetail: {
    color: '#3281ff'
  }
})
