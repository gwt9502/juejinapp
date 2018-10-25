import '../utils/global'
import React, { Component } from 'react'
import { Text, View, Image, ActivityIndicator } from 'react-native'
import { createStackNavigator, createBottomTabNavigator, createSwitchNavigator, NavigationEvents } from 'react-navigation'
import Home from '../pages/Home'
import Search from '../pages/Search'
import Boiling from '../pages/Boiling'
import Quiz from '../pages/Quiz'
import My from '../pages/My'
import Login from '../pages/Login'
import AuthLoadingScreen from '../pages/AuthLoadingScreen'
import ItemDetail from '../pages/ItemDetail'

// 我的页面
import Myscreen from './myScreen'

const RouterBootom = createBottomTabNavigator({
  掘金: {
    screen: Home,
    navigationOptions: ({ navigation }) => ({
      tabBarLabel: '首页',
      tabBarIcon: ({ focused, tintColor }) => {
        const url = focused ? require(`../img/tab_home.png`) : require(`../img/tab_home_normal.png`)
        return  <Image source={url} style={{height: 28, width: 28}} />
      }
    })
  },
  搜索: {
    screen: Search,
    navigationOptions: ({ navigation }) => ({
      tabBarLabel: '搜索',
      tabBarIcon: ({ focused, tintColor }) => {
        const url = focused ? require(`../img/tab_explore.png`) : require(`../img/tab_explore_normal.png`)
        return  <Image source={url} style={{height: 30, width: 30}} />
      }
    })
  },
  沸点: {
    screen: Boiling,
    navigationOptions: ({ navigation }) => ({
      tabBarLabel: '沸点',
      tabBarIcon: ({ focused, tintColor }) => {
        const url = focused ? require(`../img/tab_feidian.png`) : require(`../img/tab_feidian_normal.png`)
        return  <Image source={url} style={{height: 30, width: 30}} />
      }
    })
  },
  小册: {
    screen: Quiz,
    navigationOptions: ({ navigation }) => ({
      tabBarLabel: '小册',
      tabBarIcon: ({ focused, tintColor }) => {
        const url = focused ? require(`../img/tab_xiaoce.png`) : require(`../img/tab_xiaoce_normal.png`)
        return  <Image source={url} style={{height: 30, width: 30}} />
      }
    })
  },
  我的: {
    screen: My,
    navigationOptions: ({ navigation }) => ({
      tabBarLabel: '我的',
      tabBarIcon: ({ focused, tintColor }) => {
        const url = focused ? require(`../img/tab_profile.png`) : require(`../img/tab_profile_normal.png`)
        return  <Image source={url} style={{height: 30, width: 30}} />
      }
    })
  }
}, {
  // initialRouteName: '沸点',
  tabBarPosition: 'bottom',
  swipeEnabled: true,
  animationEnabled: false,
  lazy: true,
  tabBarOptions: {
    activeTintColor: '#3281ff',
    inactiveTintColor: '#abb4bf',
    style: {
      backgroundColor: '#fff',
    }
  },
  headerStyle: {
    borderBottomWidth: 0,
    elevation: 0
  },
  headerMode: null
})

const RouterScreen = createStackNavigator({
  RouterBootom: { screen: RouterBootom, navigationOptions: ({ navigation }) => ({
    title: `${navigation.state.routes[navigation.state.index].routeName}`,
    headerBackTitle: null,
    headerTitleStyle: {
      color: '#fff',
      fontSize: 15
    }
  })},
  Login: { screen: Login, navigationOptions: ({ navigation }) => ({
    header: null
  })},
  ItemDetail: { screen: ItemDetail, navigationOptions: ({ navigation }) => ({
    title: `${navigation.state.params.entryItem.title || navigation.state.params.entryItem.entry.title}`
  }) },
  ...Myscreen
}, {
  navigationOptions: ({ navigation }) => ({
    headerStyle: {
      backgroundColor: '#3281ff',
      borderBottomWidth: 0
    },
    gesturesEnabled: true,
    headerTintColor: '#fff',
    headerBackTitle: null
  })
  // headerMode: null
})

const defaultGetStateForAction = RouterScreen.router.getStateForAction

// 全局路由导航
RouterScreen.router.getStateForAction = (action, state) => {
  return defaultGetStateForAction(action, state)
}

const AppRouter = createSwitchNavigator({
  AuthLoading: AuthLoadingScreen,
  RouterScreen: RouterScreen
}, {
  initialRouteName: 'AuthLoading'
})
// AppRouter.addListener('didBlur', payload => {
//   console.log(payload)
// })

export default AppRouter