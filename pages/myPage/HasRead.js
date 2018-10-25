import React, { Component } from 'react'
import { Text, StyleSheet, View, FlatList } from 'react-native'
import FlatListFooterComponent from '../component/FlatListFooterComponent'
import RenderItem from '../component/RenderItem'
import { observer, inject } from 'mobx-react';

@inject('hasRead')
@observer
export default class HasRead extends Component {
  
  static navigationOptions = ({ navigation }) => ({
    title: '阅读过的文章'
  })

  componentDidMount () {
    this.props.hasRead.getReadHistoryLists()
  }

  loadMoreData = () => {
    const { isEnd } = this.props.hasRead
    !isEnd && this.props.hasRead.getReadHistoryLists()
  }

  ListEmptyComponent = () => {
    const { readHistoryLists, isEnd } = this.props.hasRead
    return readHistoryLists.length == 0 && isEnd && <View style={{width: SCREEN_WIDTH, height: SCREEN_HEIGHT - 64, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center'}}><Text>暂无阅读过的文章</Text></View>
  }

  renderItem = ({ item, index }) => <RenderItem item={item} index={index} {...this.props.navigation} style={{height: 100}} />

  render() {
    const { readHistoryLists, isEnd } = this.props.hasRead
    return (
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <FlatList
          data={this.props.hasRead.readHistoryLists}
          keyExtractor={(item, index) => index.toString()}
          ListHeaderComponent={this.renderListHeader}
          ItemSeparatorComponent={() => <View style={{height: 1, backgroundColor: '#F4F6F9'}}></View>}
          renderItem={this.renderItem}
          style={{position: 'relative'}}
          onEndReachedThreshold={0.2}
          onEndReached={this.loadMoreData}
          getItemLayout={(data, index) => (
            {length: 101, offset: 101 * index, index}
          )}
          ListEmptyComponent={this.ListEmptyComponent}
          ListFooterComponent={() => !isEnd && <FlatListFooterComponent isEnd={this.props.hasRead.isEnd} />}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({})
