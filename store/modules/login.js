import { observable, action } from "mobx";
import { AsyncStorage } from 'react-native';

class Login {
  @action.bound
  submit = (options, navigate) => {
    API('post', 'https://juejin.im/auth/type/phoneNumber', options)
    .then(async res => {
      global.isLogin = true
      await setUserInfo({'token': res.data.token, 'uid': res.data.userId, 'clientId': res.data.clientId})
      // await setUserInfo({'token': 'eyJhY2Nlc3NfdG9rZW4iOiJUcVpIUzJQSDZuWjVCcTNrIiwicmVmcmVzaF90b2tlbiI6IjdhU0hRZDZRVUZ2YkJBeHMiLCJ0b2tlbl90eXBlIjoibWFjIiwiZXhwaXJlX2luIjoyNTkyMDAwfQ==', 'uid': '5a33936f51882565845455b7', 'clientId': '1536917488671'})
      // await navigate.pop()
      Toast('登录成功', 'success')
      // console.log(navigate)
      await setTimeout(() => {
        navigate.popToTop()
      }, 800)
    })
    .catch(errStatus => {
      let msg = ''
      switch (errStatus) {
        case 401:
          msg = '密码错误'
          break;
        case 404:
          msg = '用户不存在'
          break;
        default:
          msg = '未知错误'
          break;
      }
      Toast(msg)
    })
  }
}

export default new Login()