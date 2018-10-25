import React, { Component } from 'react'
import { Text, StyleSheet, View, FlatList, TouchableOpacity, Image, RefreshControl } from 'react-native'
import { observer, inject } from 'mobx-react';
import { Carousel } from 'teaset';
import FlatListFooterComponent from './component/FlatListFooterComponent'
import RenderItem from './component/RenderItem'
import EmptyComponent from './component/EmptyComponent'

@inject('search')
@observer
export default class Search extends Component {

  componentDidMount () {
    this.props.search.getBannerList()
    this.props.search.getEntryByRank(true)
  }

  renderListHeader = () => <View style={styles.searchHeader}>
    <TouchableOpacity style={styles.searchInput}>
      <View style={styles.serarchView}>
        <Image source={require('../img/tab_explore_normal.png')} style={{height: 23, width: 23}} />
        <Text style={{color: '#abb4bf', marginLeft: 3}}>搜索</Text>
      </View>  
    </TouchableOpacity>
    <Carousel style={{height: SCREEN_WIDTH/108*36}}>
      {
        this.props.search.bannerList.map((item, index) => <TouchableOpacity key={index}><Image source={{uri: item.screenshot}} style={{height: SCREEN_WIDTH/108*36, backgroundColor: '#ccc'}}/></TouchableOpacity>)
      }
    </Carousel>
    <View style={styles.tabs}>
      {
        ['本周最热', '收藏集', '活动'].map((item, index) => <TouchableOpacity key={index}>
          <View style={{alignItems: 'center'}}>
            <Image source={require('../img/pin_hot.png')} style={{width: 40, height: 40}} />
            <Text style={{color: '#333', marginTop: 5}}>{item}</Text>
          </View>
        </TouchableOpacity>)
      }
    </View>
    <View style={{height: 10, backgroundColor: '#F4F6F9'}}></View>
    <View style={styles.listHeader}>
      <Image source={require('../img/pin_hot.png')} style={{height: 20,width: 20, marginRight: 8}} />
      <Text style={{color: '#333'}}>热门文章</Text>
    </View>
  </View>

  renderItem = ({ item, index }) => <RenderItem item={item} index={index} {...this.props.navigation} style={{height: 100}} />

  ListEmptyComponent = () => <EmptyComponent />

  loadMoreData = () => {
    const { isEnd, loading } = this.props.search
    !isEnd && !loading && this.props.search.getEntryByRank()
  }

  initList = () => this.props.search.getEntryByRank(true)

  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <FlatList
          data={this.props.search.lists}
          keyExtractor={(item, index) => index.toString()}
          ListHeaderComponent={this.renderListHeader}
          refreshControl={
            <RefreshControl
              refreshing={this.props.search.loading}
              onRefresh={this.initList}
            />
          }
          ItemSeparatorComponent={() => <View style={{height: 1, backgroundColor: '#F4F6F9'}}></View>}
          renderItem={this.renderItem}
          style={{position: 'relative'}}
          onEndReachedThreshold={0.2}
          onEndReached={this.loadMoreData}
          ListEmptyComponent={this.ListEmptyComponent}
          getItemLayout={(data, index) => (
            {length: 101, offset: 101 * index, index}
          )}
          ListFooterComponent={() => <FlatListFooterComponent isEnd={this.props.search.isEnd} />}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  serarchView: {
    backgroundColor: '#F4F6F9',
    height: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  searchInput: {
    height: 30,
    marginVertical: 10,
    paddingHorizontal: 10
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
    marginBottom: 20,
  },
  listHeader: {
    height: 45,
    borderBottomColor: '#efefef',
    borderBottomWidth: 1,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center'
  }
})
