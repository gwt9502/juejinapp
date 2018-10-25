import React from 'react';
import { StyleSheet, Text, View, DeviceEventEmitter, ActivityIndicator } from 'react-native';
import AppRouter from './router'
import { Provider, observer } from 'mobx-react'
import store from './store'

if (!__DEV__) {
	global.console = {
		info: () => {
		},
		log: () => {
		},
		warn: () => {
		},
		error: () => {
		},
	};
}

export default class App extends React.Component {

  render () {
    return (
      <Provider {...store}>
        <AppRouter />
      </Provider>
    );
  }
}
