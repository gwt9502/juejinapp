import React, { Component } from 'react'
import { Text, View, StyleSheet, Image, TouchableOpacity, FlatList, RefreshControl } from 'react-native'
import { observer, inject } from 'mobx-react';
import FlatListFooterComponent from './component/FlatListFooterComponent'
import { Carousel, AlbumView } from 'teaset'

@inject('boiling')
@observer
export class Boiling extends Component {

  componentDidMount () {
    this.props.boiling.getHotRecommendLists()
    this.props.boiling.getRecommendLists(true)
  }

  renderListHeader = () => {
    const { hotRecommendLists } = this.props.boiling
    return (<View style={styles.boilContainer}>
      {
        hotRecommendLists.length > 0 && <Carousel style={{height: 100}} carousel={false} cycle={false}>
        {
          hotRecommendLists.map((item) => this.renderRecommendItem(item))
        }
      </Carousel>
      }
    </View>)
  }

  renderRecommendItem = (item) => {
    const urlSrc = item.isRecommend ? require('../img/ic_topic_star.png') : require('../img/pin_hot.png')
    return <TouchableOpacity key={item.objectId} style={styles.hotItem}>
      <View style={styles.itemHeader}>
        <Image source={urlSrc} style={styles.icon} />
        <Text style={{fontWeight: '500'}}>{item.isRecommend ? '编辑推荐' : '热门沸点'}</Text>
      </View>
      <View style={styles.itemContent}>
        <Text ellipsizeMode={'tail'} numberOfLines={3} style={styles.itemTextContent}>{item.content}</Text>
        {
          item.pictures && item.pictures.length && <Image source={{uri: item.pictures[0]}} style={styles.iconPicture} />
        }
      </View>
    </TouchableOpacity>
  }

  renderItem = ({item}) => {
    // return <Text key={item.objectId}>{item.objectId}</Text>
    return <View key={item.objectId} style={styles.boilItem}>
      <View style={[styles.boilItemHeader, styles.itemContent]}>
        <View style={[styles.userInfo]}>
          <View style={styles.userAvater}>
            <Image source={{uri: item.user.avatarLarge}} defaultSource={require('../img/default_avatar.png')} style={{width: 40, height: 40, borderRadius: 20, marginRight: 8}} />
          </View>
          <View style={[styles.userMsg, {justifyContent: 'space-around'}]}>
            <View style={{marginBottom: 2}}><Text>{item.user.username}</Text></View>
            <View style={styles.itemContent}>
              {
                item.user.jobTitle ? <Text style={styles.textStyle}>{item.user.jobTitle}</Text> : null
              }
              {
                item.user.jobTitle && item.user.company ? <Text style={styles.textStyle}> @ {item.user.company}</Text> : null
              }
              {
                item.user.jobTitle ? <Text style={styles.textStyle}> · </Text> : null
              }
              <Text style={styles.textStyle}>{timeFilter(item.createdAt)}</Text>
            </View>
          </View>
        </View>
        <View style={styles.r}>
          <Image source={require('../img/ic_pin_more.png')} style={{width: 12, height: 12}} />
        </View>
      </View>
      <View style={styles.boilItemContent}>
        <Text style={{color: '#666', marginVertical: 10}} ellipsizeMode={'tail'} numberOfLines={4}>{item.content}</Text>
        {
          item.pictures && item.pictures.length && <View>
            {
              item.pictures.length === 1 ? <Image source={{uri: item.pictures[0]}} style={{width: 100, height: 100}} /> : item.pictures.map((i, index) => <Image source={{uri: i}} key={index} style={{width: 100, height: 100}} />)
            }
          </View>
        }
      </View>
      <View style={styles.boilItemFooter}></View>
    </View>
  }

  render() {
    return (
      <FlatList
          data={this.props.boiling.recommendLists}
          keyExtractor={(item, index) => index.toString()}
          // initialNumToRender={Math.ceil(SCREEN_HEIGHT/170)}
          ListHeaderComponent={this.renderListHeader}
          refreshControl={
            <RefreshControl
              refreshing={this.props.boiling.loading}
              onRefresh={this.initList}
            />
          }
          // ListEmptyComponent={this.ListEmptyComponent}
          // onEndReachedThreshold={0.1}
          // onEndReached={this.loadMoreData}
          ItemSeparatorComponent={() => <View style={{height: 10, backgroundColor: '#F4F6F9'}}></View>}
          renderItem={this.renderItem}
          removeClippedSubviews={true}
          getItemLayout={(data, index) => (
            {length: 170, offset: 170 * index, index}
          )}
          ListFooterComponent={() => <FlatListFooterComponent isEnd={this.props.boiling.isEnd} />}
        />
    )
  }
}

const styles = StyleSheet.create({
  boilContainer: {
    marginBottom: 10
  },
  hotItem: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    minHeight:  SCREEN_WIDTH/375*135 - 30,
    backgroundColor: '#fff'
  },
  icon: {
    width: 15,
    height: 15,
    marginRight: 5
  },
  itemHeader: {
    flexDirection: 'row',
    marginBottom: 5,
    alignItems: 'center'
  },
  itemContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemTextContent: {
    flex: 1
  },
  iconPicture: {
    width: 50,
    height: 50,
    borderRadius: 4,
    marginLeft: 10,
    backgroundColor: '#333'
  },
  boilItem: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#fff'
  },
  userInfo: {
    flex: 1,
    flexDirection: 'row',
    overflow: 'hidden',
    marginRight: 20
  },
  textStyle: {
    fontSize: 12,
    color: '#999'
  }
})

export default Boiling