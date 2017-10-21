/**
* @providesModule component/Comparator
*/

import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { CheckBox } from 'react-native-elements';
import Style from 'style/MainStyle';
import TextInput from 'component/TextInput';

class Comparator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: false,
            value: '',
            latest: 1290000,
            tempValue: ''
        };
        this.checkHandler = this.checkHandler.bind(this);
        this.changeTextHandler = this.changeTextHandler.bind(this);
    }
    changeTextHandler(value) {
        var reg = /^[0-9]+([,.][0-9]+)?$/g;
        if (reg.test(value) || value == "") {
            this.setState({
                value,
                tempValue: value,
                checked: false
            }, this.sendValueToProps);
        }
    }
    checkHandler() {
        this.setState({
            checked: !this.state.checked
        }, ()=>{
            if (this.state.checked) {
                this.setState({
                    value: this.state.latest.toString()
                }, this.sendValueToProps);
            } else {
                this.setState({
                    value: this.state.tempValue
                }, this.sendValueToProps);
            }
        });
    }
    sendValueToProps() {
        this.props.onChange && this.props.onChange(this.state.value);
    }
    render() {
        return (
            <View style={{width: '100%', padding: 10}}>
                <TextInput keyboardType="numeric" onChangeText={this.changeTextHandler} style={Style.text} placeholder={'Input desired value'} value={this.state.value}/> 
                <CheckBox style={{padding: 10}} onPress={this.checkHandler} checked={this.state.checked} title='Use Latest Rate' />
            </View>
        );
    }
}

export default Comparator;