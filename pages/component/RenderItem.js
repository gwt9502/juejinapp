import React, { Component } from 'react'
import { Text, StyleSheet, View, TouchableOpacity, Image } from 'react-native'
import itemStyle from '../styles/itemStyle'

export default class RenderItem extends Component {

  shouldComponentUpdate (nextProps, nextState) {
    if (nextProps.item.index == this.props.index) {
      return false
    }
    if (nextProps.currentIndex == this.props.currentIndex) {
      return false
    }
    if (nextProps.item.objectId == this.props.item.objectId) {
      return false
    }
    return true
  }

  goItemDetail = () => {
    this.props.navigate({routeName: 'ItemDetail', params: {entryItem: this.props.item}, key: this.props.item.objectId})
  }

  render() {
    const { item, index, showItemHeader, style } = this.props
    console.log('我render了')
    return (
      <TouchableOpacity key={index} onPress={() => this.goItemDetail()} style={style}>
        <View style={itemStyle.itemContainer}>
          {
            showItemHeader && <View style={itemStyle.itemHeader}>
              <View style={itemStyle.itemUserInfo}>
                {
                  item.user.avatarLarge ? <Image source={{uri: item.user.avatarLarge}} defaultSource={require('../../img/default_avatar.png')} style={{width: 20, height: 20, borderRadius: 10}} /> : <Image source={require('../../img/default_avatar.png')} style={{width: 20, height: 20, borderRadius: 10}} />
                }
                <Text style={{color: '#333', marginLeft: 10}}>{item.user.username}</Text>
              </View>
              <View style={itemStyle.itemType}>
                {
                  item.tags && item.tags.slice(0, 2).map((v, i) => <Text key={i} style={{color: '#abb4bf', marginRight: 5}}>{v.title}</Text>)
                }
              </View>
            </View>
          }
          <View style={[itemStyle.itemContent, {marginVertical: showItemHeader ? 0 : 15}]}>
            <View style={{flex: 1}}>
              <Text ellipsizeMode={'tail'} numberOfLines={showItemHeader ? 1 : 2} style={{fontSize: 16, marginBottom: 5, lineHeight: 20}}>{item.title}</Text>
              {
                showItemHeader ? <Text ellipsizeMode={'tail'} numberOfLines={3} style={{color: '#abb4bf', fontSize: 13, lineHeight: item.screenshot ? 18 : 20}}>{item.summaryInfo}</Text> : <Text ellipsizeMode={'tail'} numberOfLines={2} style={{color: '#abb4bf', fontSize: 11}}>{item.collectionCount}人喜欢 · {item.user.username} · {timeFilter(item.createdAt)}</Text>
              }
            </View>
            {
              item.screenshot && <Image source={{uri: item.screenshot}} style={{width: 75, height: 75, marginLeft: 10, backgroundColor: '#333'}} />
            }

          </View>
          {
            showItemHeader && <View style={itemStyle.itemFooter}>
              <View style={itemStyle.label}>
                <Image source={require('../../img/ic_dynamic_collect.png')} style={itemStyle.labelImage} />
                <Text style={itemStyle.lbaelText}>{item.collectionCount}</Text>
              </View>
              <View style={itemStyle.label}>
                <Image source={require('../../img/ic_dynamic_comment.png')} style={itemStyle.labelImage} />
                <Text style={itemStyle.lbaelText}>{item.commentsCount}</Text>
              </View>
            </View>
          }
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({})
