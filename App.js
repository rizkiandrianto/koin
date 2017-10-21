import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { KeepAwake, Font } from 'expo';
import { StackNavigator } from 'react-navigation';

import reducer from 'redux/reducer';

import Main from 'screen/Main';
import Dashboard from 'screen/Dashboard';
import Calculator from 'screen/Calculator';
import HeaderScroll from 'screen/HeaderScroll';
import Loading from 'screen/Loading';
import { GET } from 'helper/Fetch';
import { setMarket } from 'redux/action/MainAction';

const middlewares = [thunk];
if (process.env.NODE_ENV == "development") middlewares.push(createLogger());
let store = createStore(reducer, {}, applyMiddleware(...middlewares));

KeepAwake.activate();

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      fontLoaded: false
    };
  }
  componentWillMount() {
    // this.polling();
  }
  async componentDidMount() {
    await Font.loadAsync({
      'Arial': require('./asset/font/arial.ttf'),
      'Rubik-Black': require('@shoutem/ui/fonts/Rubik-Black.ttf'),
      'Rubik-BlackItalic': require('@shoutem/ui/fonts/Rubik-BlackItalic.ttf'),
      'Rubik-Bold': require('@shoutem/ui/fonts/Rubik-Bold.ttf'),
      'Rubik-BoldItalic': require('@shoutem/ui/fonts/Rubik-BoldItalic.ttf'),
      'Rubik-Italic': require('@shoutem/ui/fonts/Rubik-Italic.ttf'),
      'Rubik-Light': require('@shoutem/ui/fonts/Rubik-Light.ttf'),
      'Rubik-LightItalic': require('@shoutem/ui/fonts/Rubik-LightItalic.ttf'),
      'Rubik-Medium': require('@shoutem/ui/fonts/Rubik-Medium.ttf'),
      'Rubik-MediumItalic': require('@shoutem/ui/fonts/Rubik-MediumItalic.ttf'),
      'Rubik-Regular': require('@shoutem/ui/fonts/Rubik-Regular.ttf'),
      'rubicon-icon-font': require('@shoutem/ui/fonts/rubicon-icon-font.ttf'),
    });

    this.setState({ 
      fontLoaded: true 
    });
  }
  polling() {
    this.call_data();
    setTimeout(() => {
      this.call_data();
    }, 60000);
  }
  call_data() {
    GET({
      url: 'ticker',
      query: {
        limit: 10,
        convert: 'IDR'
      }
    }, (err, res)=>{
      if (!err && res) {
        store.dispatch(setMarket(res));
      }
    });
  }
  render() {
    const Apps = StackNavigator({
      Main: {
        screen: Main
      },
      Dashboard: {
        screen: Dashboard
      },
      HeaderScroll: {
        screen: HeaderScroll
      },
      Calculator: {
        screen: Calculator
      }
    }, {
      initialRouteName: 'Calculator'
    });
    if (this.state.fontLoaded) {
      return (
        <Provider store={store}>
            <Apps />
        </Provider>
      );
    }
    return <Loading />;
  }
}
