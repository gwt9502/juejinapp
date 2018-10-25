import React, { Component } from 'react'
import { Text, StyleSheet, View, FlatList, Button, TouchableOpacity, Image, RefreshControl, VirtualizedList } from 'react-native'
import { observer, inject } from 'mobx-react';
import EmptyComponent from './component/EmptyComponent'
import FlatListFooterComponent from './component/FlatListFooterComponent'
import RenderItem from './component/RenderItem'

let didBlurSubscription

@inject('home')
@observer
export default class Home extends Component {

  state = {
    currentIndex: 0,
    showRecommendList: true
  }

  componentDidMount () {
    this.mounted = true
    didBlurSubscription = this.props.navigation.addListener('willFocus', payload => {
      console.log(123)
      this.setState({showRecommendList: isLogin})
      isLogin && this.props.home.getEntryByHotRecomment()
    })
    // console.log(didBlurSubscription)
    // // this.props.navigation.addListener('willFocus', payload => {
    // //   this.setState({showRecommendList: isLogin})
    // //   isLogin && this.props.home.getEntryByHotRecomment()
    // // })
    this.initList()
  }

  componentWillUnmount () {
    this.mounted = false
    didBlurSubscription.remove()
  }

  initList = async () => {
    if (this.mounted) {
      this.props.home.getTimelineList(true)
      isLogin && this.props.home.getEntryByHotRecomment()
      this.setState({showRecommendList: isLogin})
    }
  }

  loadMoreData = () => {
    if (this.mounted) {
      const { isEnd, loading } = this.props.home
      !isEnd && !loading && this.props.home.getTimelineList()
    }
  }

  changeCurrentIndex = () => {
    this.state.currentIndex == Math.ceil(this.props.home.recommendList.length/3) - 1 ? this.setState({currentIndex: 0}) : this.setState({currentIndex: this.state.currentIndex+1})
  }

  closeRecommend = () => {
    this.setState({showRecommendList: false})
  }

  renderListHeader = () => <View style={styles.listHeaderContainer}>
    {
      !isLogin && <View><TouchableOpacity style={[styles.loginCard, styles.flexRow]} onPress={() => this.props.navigation.push('Login')}>
        <View style={styles.cardLeft}>
          <Text style={{fontSize: 16}}>登录账号</Text>
          <Text style={{fontSize: 13, color: '#666', marginTop: 5}}>收藏文章，同步阅读记录，数据永不丢失</Text>
        </View>
        <View><Text style={{fontSize: 16, color: '#3281ff'}}>登录</Text></View>
      </TouchableOpacity>
      <View style={{height: 10, backgroundColor: '#F4F6F9'}}></View>
      </View>
    }
    {
      this.state.showRecommendList && isLogin && this.props.home.recommendList.length >0 && <View style={styles.recommendContainer}>
        <View style={[styles.recommendHeader, styles.flexRow]}>
          <View style={[styles.headerLeft, styles.flexRow]}>
            <Image source={require('../img/ic_hot_home.png')} style={{width: 20, height: 20}} />
            <Text style={{color: '#3281ff', marginLeft: 8, fontSize: 15}}>热门推荐</Text>
          </View>
          <View style={[styles.headerRight, styles.flexRow]}>
            <TouchableOpacity onPress={() => this.changeCurrentIndex()}>
              <Image source={require('../img/refresh_icon.png')} style={{width: 16, height: 16}} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.closeRecommend()}>
              <Image source={require('../img/chart_close.png')} style={{width: 10, height: 10, marginLeft: 20}} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.recommendList}>
          {
            this.props.home.recommendList.slice(this.state.currentIndex*3, (this.state.currentIndex+1)*3).map((item, index) => <RenderItem item={item} index={index} key={index} {...this.props.navigation} {...this.state} />)
          }
        </View>
        <View style={{height: 10, backgroundColor: '#F4F6F9'}}></View>
      </View>
    }
  </View>

  renderItem = ({item, index}) => <RenderItem item={item} index={index} showItemHeader {...this.props.navigation} style={{height: 160}} />

  ListEmptyComponent = () => <EmptyComponent showItemHeader />

  render() {
    return (
      <View style={styles.homeView}>
        <FlatList
          data={this.props.home.lists}
          keyExtractor={(item, index) => index.toString()}
          // initialNumToRender={Math.ceil(SCREEN_HEIGHT/170)}
          ListHeaderComponent={this.renderListHeader}
          refreshControl={
            <RefreshControl
              refreshing={this.props.home.loading}
              onRefresh={this.initList}
            />
          }
          style={{position: 'relative'}}
          ListEmptyComponent={this.ListEmptyComponent}
          onEndReachedThreshold={0.1}
          onEndReached={this.loadMoreData}
          ItemSeparatorComponent={() => <View style={{height: 10, backgroundColor: '#F4F6F9'}}></View>}
          renderItem={this.renderItem}
          removeClippedSubviews={true}
          getItemLayout={(data, index) => (
            {length: 170, offset: 170 * index, index}
          )}
          ListFooterComponent={() => <FlatListFooterComponent isEnd={this.props.home.isEnd} />}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  homeView: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loginCard: {
    backgroundColor: '#fff',
    marginBottom: 10,
    padding: 15,
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  recommendContainer: {
    
  },
  recommendHeader: {
    height: 45,
    borderBottomWidth: 1,
    borderBottomColor: '#efefef',
    paddingHorizontal: 15
  }
})
