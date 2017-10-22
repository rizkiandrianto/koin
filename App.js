import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { KeepAwake, Font } from 'expo';
import { StackNavigator, DrawerNavigator, DrawerItems } from 'react-navigation';

import reducer from 'redux/reducer';

import Header from 'component/Header';
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
    this.polling();
  }
  async componentDidMount() {
    await Font.loadAsync({
      'Arial': require('./asset/font/arial.ttf'),
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
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
        limit: 200,
        convert: 'IDR'
      }
    }, (err, res)=>{
      if (!err && res) {
        store.dispatch(setMarket(res));
      }
    });
  }
  render() {
    const MainNav = StackNavigator({
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
      initialRouteName: 'Main'
    });

    const DrawerNav = DrawerNavigator({
      "Main Screen": { 
        screen: Main
      },
      "Calculator": { 
        screen: Calculator
      },
      "Header Scroll": { screen: HeaderScroll },
    }, {
      contentComponent: props => <ScrollView><DrawerItems {...props} /></ScrollView>,
      useNativeAnimations: false
    });

    const DrawerStack = StackNavigator({
      drawer: {
        screen: DrawerNav
      }
    });

    const Nav = StackNavigator({
      // loginStack: {
      //   screen: MainNav
      // },
      drawerStack: {
        screen: DrawerNav,
        navigationOptions: ({navigation}) => {
          return {
            header: <Header navigation={navigation}/>
          }
        }
      }
    }, {
      headerMode: 'float',
      initialRouteName: 'drawerStack'
    });

    if (this.state.fontLoaded) {
      return (
        <Provider store={store}>
            <Nav />
        </Provider>
      );
    }
    return <Loading />;
  }
}
