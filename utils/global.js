import { Dimensions, AsyncStorage, DeviceEventEmitter} from 'react-native';
import { Toast } from 'teaset';
import API from '../api'

Toast.messageDefaultPosition = 'top'
const { width, height } = Dimensions.get('window')

global.SCREEN_WIDTH = width
global.SCREEN_HEIGHT = height

// 全局提醒
global.Toast = (msg, type) => {
  switch (type) {
    case 'success':
      return Toast.success(msg)
    case 'fail':
      return Toast.fail(msg)
    default:
      return Toast.message(msg)
  }
}

global.API = API

// 手机验证
global.isValidMobile = (phone) => {
  let telReg = /^(0|86|17951)?(13[0-9]|15[012356789]|17[135678]|18[0-9]|14[579])[0-9]{8}$/
  if (telReg.test(phone.replace(/\s+/g, ''))) {
    return true
  }
  global.Toast('请输入正确的手机号')
}

global.isLogin = false
global.userInfo = {}

// 获取用户信息
global.getUserInfo = () => {
  return AsyncStorage.getItem('auth', (err, result) => {
    if (result == null) {
      global.isLogin = false
      global.userInfo = {}
    } else {
      global.userInfo = JSON.parse(result)
      global.isLogin = true
    }
  })
}

// 设置用户信息
global.setUserInfo = (data) => {
  AsyncStorage.setItem('auth', JSON.stringify(data), (err, result) => {
    global.isLogin = true
    global.userInfo = data
  })
}

// 退出登录
global.logOut = (navigate) => {
  global.isLogin = false
  global.userInfo = {}
  global.Toast('退出成功')
  // setTimeout(() => {
  //   navigate.pop()
  // }, 800)
  AsyncStorage.clear((err, result) => {
    navigate.pop()
  })
}

// 过滤时间
global.timeFilter = (date) => {
  if (!date) {
    return '';
  }
  var dvalue = parseInt(new Date().getTime()) - parseInt(new Date(date).getTime());
  var minTime = 60 * 1000;
  var hourTime = 60 * 60 * 1000;
  var dayTime = 24 * hourTime;
  var monthTime = 30 * dayTime;
  var yearTime = 12 * monthTime;
  if (dvalue < minTime) {
    return '刚刚';
  } else if (dvalue >= minTime && dvalue < hourTime) {
    return parseInt(dvalue / minTime) + '分钟前';
  } else if (dvalue >= hourTime && dvalue < dayTime) {
    return parseInt(dvalue / hourTime) + '小时前';
  } else if (dvalue >= dayTime && dvalue < monthTime) {
    return parseInt(dvalue / dayTime) + '天前';
  } else if (dvalue >= monthTime && dvalue < yearTime) {
    return parseInt(dvalue / monthTime) + '月前';
  } else if (dvalue >= yearTime) {
    return parseInt(dvalue / yearTime) + '年前';
  }
};

var strToNumArr = function (str) {
  var arr1 = (str + '').split('');
  var arr = [];
  for (i=0, len1 = arr1.length; i < len1; i++) {
    var arr2 = []
    for (j = 0, len2 = parseInt(arr1[i]); j <= len2; j++) {
      arr2.push(j)
    }
    arr.push(arr2);
  }
  return arr;
};