import React, { Component } from 'react'
import { Text, StyleSheet, View, TouchableOpacity, Image } from 'react-native'

export default class LabelItem extends Component {

  state = {
    operateTagIds: new Map()
  }

  shouldComponentUpdate (nextProps, nextState) {
    // 改变是否关注
    if (nextState.operateTagIds.has(nextProps.item.id)) {
      return true
    }
    // 改变tab不重新渲染
    if (nextProps.activeIndex == 0 || nextProps.activeIndex == 1) {
      return false
    }
    if (nextProps.item.id == this.props.item.id) {
      return false
    }
    // console.log(nextProps)
    // return true
    // if (nextState.operateTagIds.size == 0) {
    //   console.log(nextProps, nextState)
    //   return true
    // }
    // console.log(nextProps.item, nextState, nextState.operateTagIds.has(nextProps.item.id))
    // return nextState.operateTagIds.has(nextProps.item.id)
  }

  changeTagStatus = (item) => {
    this.props.label.updateTagStatus(item.isSubscribe ? 'DELETE' : 'PUT', item.id)
    .then(res => {
      item.isSubscribe = !item.isSubscribe
      const operateTagIds = new Map(this.state.operateTagIds)
      operateTagIds.set(item.id, !operateTagIds.get(item.id))
      this.setState({operateTagIds: operateTagIds})
    })
  }

  render() {
    const { item } = this.props
    console.log('我render了')
    return (
      <TouchableOpacity style={styles.tagLabel}  activeOpacity={0.5}>
        <View style={{flexDirection: 'row'}}>
          {
            item.icon ? <Image source={{uri: item.icon}} style={{width: 40, height: 40, marginRight: 10 }} /> : <Image source={require('../../img/ic_login_logo.png')} style={{width: 40, height: 40, marginRight: 10 }} />
          }
          <View style={{justifyContent: 'space-around'}}>
            <Text>{item.title}</Text>
            <Text style={{fontSize: 12, color: '#999'}}>{item.subscribersCount}人关注 · {item.entryCount}篇文章</Text>
          </View>
        </View>
        <TouchableOpacity  activeOpacity={0.5} onPress={() => this.changeTagStatus(item)}>
          <View style={[{backgroundColor: item.isSubscribe ? '#3ec700' : '#fff', borderWidth: item.isSubscribe ? 0 : 1 }, styles.tagStatus]}>
            {
              item.isSubscribe ? <Image source={require('../../img/add_icon_tag_followed.png')} style={styles.tagIcon} /> : <Image source={require('../../img/icon_add_tag.png')} style={styles.tagIcon} />
            }
            <Text style={{color: item.isSubscribe ? '#fff' : '#3ec700', fontSize: 13}}>{item.isSubscribe ? '已关注' : '关注'}</Text>
          </View>
        </TouchableOpacity>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  tagLabel: {
    height: 60,
    paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: '#efefef',
    borderBottomWidth: 1
  },
  tagIcon: {
    width: 13,
    height: 13,
    marginRight: 8
  },
  tagStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 30,
    width: 75,
    borderColor: '#3ec700'
  }
})
