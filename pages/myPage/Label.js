import React, { Component } from 'react'
import { Text, StyleSheet, View, ScrollView, TouchableOpacity, FlatList } from 'react-native'
import LabelItem from '../component/LabelItem'
import FlatListFooterComponent from '../component/FlatListFooterComponent'
import { SegmentedView } from 'teaset'
import { observer, inject } from 'mobx-react';

@inject('label')
@observer
export default class Label extends Component {

  static navigationOptions = ({ navigation }) => ({
    title: '标签管理'
  })

  state = {
    activeIndex: 0
  }

  componentDidMount () {
    this.props.label.getMyTagLists()
    this.props.label.getRecommendTaglists()
    this.props.label.getAllTagLists(true)
  }

  renderItem = ({ item, index }) => <LabelItem item={item} key={index} {...this.props} />

  renderListHeader = () => <View style={styles.tagHeader}>
    {
      this.props.label.recommendTaglists.length > 0 && <View>
        <Text style={styles.headerTitle}>推荐标签</Text>
        {
          this.props.label.recommendTaglists.map((item, index) => <LabelItem item={item} key={index} {...this.props} />)
        }
      </View>
    }
    <Text style={styles.headerTitle}>你可能感兴趣的标签</Text>
  </View>

  onChange = (index) => {
    this.setState({activeIndex: index})
  }

  loadMore = () => {
    const { loading, isEnd } = this.props.label
    !loading && !isEnd && this.props.label.getAllTagLists()
  }

  render() {
    return (
      <SegmentedView barStyle={{height: 45, backgroundColor: '#3281ff'}} style={{flex: 1}} type='carousel' indicatorLineColor="#fff" indicatorType="boxWidth" onChange={(index) => this.onChange(index)} activeIndex={this.state.activeIndex}>
        <SegmentedView.Sheet title='已关注标签' titleStyle={{color: 'rgba(255,255,255,0.5)'}} activeTitleStyle={{color: '#fff'}}>
          <ScrollView style={styles.labelContainer}>
            {
              this.props.label.myTaglists.length > 0 ? this.props.label.myTaglists.map((item, index) => <LabelItem item={item} key={index} {...this.props} {...this.state} />) : <FlatListFooterComponent isEnd={this.props.label.myTaglists.length > 0} />
            }
          </ScrollView>
        </SegmentedView.Sheet>
        <SegmentedView.Sheet title='所有标签'  titleStyle={{color: 'rgba(255,255,255,0.5)'}} activeTitleStyle={{color: '#fff'}}>
          <FlatList 
          style={styles.labelContainer}
          data={this.props.label.allTaglists}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => index.toString()}
          ListHeaderComponent={this.renderListHeader}
          refreshing={this.props.label.loading}
          onEndReachedThreshold={0.2}
          onEndReached={this.loadMore}
          ListFooterComponent={() => <FlatListFooterComponent isEnd={this.props.label.isEnd} />}
          />
        </SegmentedView.Sheet>
      </SegmentedView>
    )
  }
}

const styles = StyleSheet.create({
  labelContainer: {
    flex: 1,
    backgroundColor: '#fff'
  },
  headerTitle: {
    paddingLeft: 15,
    height: 40,
    lineHeight: 40,
    fontSize: 13,
    color: '#333',
    fontWeight: '700',
    backgroundColor: '#F4F6F9'
  }
})
