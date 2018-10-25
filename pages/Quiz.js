import React, { Component } from 'react'
import { Text, StyleSheet, View, FlatList, TouchableOpacity, Image, RefreshControl } from 'react-native'
import { observer, inject } from 'mobx-react';
import FlatListFooterComponent from './component/FlatListFooterComponent'

@inject('quiz')
@observer
export default class Quiz extends Component {

  componentDidMount () {
    this.initList()
  }

  initList = () => {
    this.props.quiz.getAllBookList(true)
  }

  loadMoreData = () => {
    const { loading, isEnd } = this.props.quiz
    !loading && !isEnd && this.props.quiz.getAllBookList()
  }

  _renderItem = ({ item, index }) => <TouchableOpacity key={index}>
    <View style={styles.item}>
      <View style={styles.itemLeft}>
        <Image source={{uri: item.img, cache: 'force-cache'}} style={{width: 75, height: 91, shadowOffset: {width: 20, height: 16}, shadowColor: 'red', backgroundColor: '#ccc'}} />
        <View style={styles.bookInfo}>
          <Text ellipsizeMode={'tail'} numberOfLines={2} style={{fontSize: 15, fontWeight: '700'}}>{item.title}</Text>
          <Text style={{fontSize: 12}}>{item.userData && item.userData.username}</Text>
          <Text style={{fontSize: 11, color: '#999'}}>
            {
              item.isFinished ? null : <Text><Text style={{color: 'rgb(246, 118, 4)'}}>预售</Text> · </Text>
            }
            {`${item.lastSectionCount}小节 · ${item.buyCount}人已购买`}
          </Text>
        </View>
      </View>
      <View style={styles.itemRight}>
        <Text style={styles.price}>{item.timeLimitDiscountFirstDay ? `惠¥${(item.price * item.timeLimitDiscountFirstDay.discountCount / 10).toFixed(1)}` : `¥${item.price}`}</Text>
      </View>
    </View>
  </TouchableOpacity>

  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <FlatList
          data={this.props.quiz.allBookList}
          keyExtractor={(item, index) => index.toString()}
          refreshControl={
            <RefreshControl
              refreshing={this.props.quiz.loading}
              onRefresh={this.initList}
            />
          }
          onEndReachedThreshold={0.1}
          onEndReached={this.loadMoreData}
          ItemSeparatorComponent={() => <View style={{height: 1, backgroundColor: '#efefef'}}></View>}
          renderItem={this._renderItem}
          ListFooterComponent={() => <FlatListFooterComponent isEnd={this.props.quiz.isEnd} />}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#fff'
  },
  itemLeft: {
    flex: 1,
    flexDirection: 'row',
  },
  bookInfo: {
    flex: 2,
    paddingHorizontal: 10,
    justifyContent: 'space-between',
  },
  itemRight: {
    height: 30,
    width: 75,
    borderRadius: 15,
    backgroundColor: 'rgb(241, 247, 254)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  price: {
    color: '#3281ff',
    fontSize: 12,
    fontWeight: '700'
  }
})
