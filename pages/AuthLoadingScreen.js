import React, { Component } from 'react'
import { Text, StyleSheet, View, Image, ImageBackground } from 'react-native'

export default class AuthLoadingScreen extends Component {

  state = {
    fromFirstLoad: false
  }

  componentDidMount() {
    const showSpreadScreen = this.props.navigation.getParam('showSpreadScreen', true)
    getUserInfo()
    .then(res => {
      setTimeout(() => {
        this.props.navigation.navigate('RouterScreen')
      }, showSpreadScreen ? 0 : 0)
    })
  }

  render() {
    const showSpreadScreen = this.props.navigation.getParam('showSpreadScreen', true)
    return (
      <View style={styles.authLoading}>
        {/* {
          showSpreadScreen ? <ImageBackground source={require('../img/launch_bcg.png')} style={styles.authImgBg}>
          <View style={styles.loadingCenter}>
            <Image source={require('../img/launch_diamond.png')} style={styles.centerImage} />
            <Text style={{color: '#000', fontWeight: '300', fontSize: 18, textAlign: 'center'}}>相信科技的力量</Text>
          </View>
          <View style={styles.loadingFooter}>
            <Image source={require('../img/launch_bottom.png')} style={styles.footerImage} />
          </View>
        </ImageBackground> : null
        } */}
        
      </View>
    )
  }
}

const styles = StyleSheet.create({
  authLoading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  authImgBg: {
    width: SCREEN_WIDTH,
    minHeight: SCREEN_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    backgroundColor: '#fff'
  },
  centerImage: {
    marginBottom: 20,
    width: 140,
    height: 140
  },
  loadingFooter: {
    position: 'absolute',
    bottom: 35
  },
  footerImage: {
    width: 300,
    height: 50,
  }
})
