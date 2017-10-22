/**
* @providesModule screen/Main
*/

import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';
import Style from 'style/MainStyle';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setIncreaseCounter } from 'redux/action/MainAction';
import Header from 'component/Header';

class Main extends Component {
    static navigationOptions = { header: <Header /> };
    constructor() {
        super();
        this.increase = this.increase.bind(this);
    }
    increase() {
        this.props.setIncreaseCounter();
    }
    render() {
        const { counter } = this.props;
        return (
            <View style={Style.container}>
                <Text>Hello World !</Text>
                <Text style={{marginBottom: 50}}>Counter : {counter}</Text>
                <Button onPress={this.increase} title="Counter + +"/>
            </View>
        );
    }
}

export default connect(
    state => ({
        counter: state.Main.counter
    }),
    dispatch => bindActionCreators({
        setIncreaseCounter
    }, dispatch)
)(Main);