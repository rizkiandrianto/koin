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
    this.polling();
  }
  async componentDidMount() {
    await Font.loadAsync({
      'Arial': require('./asset/font/arial.ttf')
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
    }, {
      initialRouteName: 'Dashboard'
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
