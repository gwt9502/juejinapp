import React, { Component } from 'react'
import { Text, View, StyleSheet, Image, TextInput, Button } from 'react-native'
import { observer, inject } from 'mobx-react';

@inject('login')
@observer
export class Login extends Component {

  state = {
    loginForm: {
      phoneNumber: '',
      password: ''
    }
  }

  validate = () => {
    if (isValidMobile(this.state.loginForm.phoneNumber) && this.validatePassword()) {
      this.props.login.submit(this.state.loginForm, this.props.navigation)
    }
  }

  validatePassword = () => {
    if (!this.state.loginForm.password) {
      Toast('请输入密码')
    } else {
      return true
    }
  }

  render() {
    return (
      <View style={styles.loginView}>
        <View style={styles.imgContainer}>
          <Image source={require('../img/ic_login_logo.png')} style={styles.loginLogo} />
        </View>
        <View style={styles.formContainer}>
          <TextInput
          maxLength={11}
          placeholder="请输入手机号"
          style={styles.input}
          keyboardType="numeric"
          autoFocus
          autoCapitalize="none"
          value={this.state.loginForm.phoneNumber}
          onChangeText={(phoneNumber) => this.setState({loginForm: Object.assign({}, this.state.loginForm, {phoneNumber: phoneNumber})})}
          />
          <TextInput
          maxLength={11}
          secureTextEntry
          placeholder="请输入密码"
          value={this.state.loginForm.password}
          style={[styles.input, {borderBottomWidth: 0}]}
          onChangeText={(password) => this.setState({loginForm: Object.assign({}, this.state.loginForm, {password: password})})}
          />
        </View>
        <View style={styles.submitView}>
          <Button
          onPress={() => this.validate()}
          title="登录"
          color="#fff"
          />
        </View>
        <View style={styles.loginFooter}>
          <Text style={{color: '#fff', textAlign: 'center'}}>掘金·juejin.im</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  loginView: {
    flex: 1,
    backgroundColor: '#3281ff',
    position: 'relative'
  },
  imgContainer: {
    marginTop: 100,
    marginBottom: 40,
    justifyContent: 'center',
    alignItems: 'center'
  },
  formContainer: {
    width: SCREEN_WIDTH - 30,
    marginLeft: 15,
    height: 100,
    backgroundColor: '#fff',
    borderRadius: 4
  },
  loginLogo: {
    width: 60,
    height: 60
  },
  input: {
    height: 50,
    borderRadius: 4,
    borderColor: '#efefef',
    borderBottomWidth: 1,
    paddingLeft: 15
  },
  submitView: {
    width: SCREEN_WIDTH - 30,
    marginLeft: 15,
    marginTop: 20,
    backgroundColor: 'rgba(0, 0, 0, .1)',
  },
  loginFooter: {
    position: 'absolute',
    bottom: 30,
    width: SCREEN_WIDTH
  }
})

export default Login