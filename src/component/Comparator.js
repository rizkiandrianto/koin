/**
* @providesModule component/Comparator
*/

import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { CheckBox, ListItem, Body, Text } from 'native-base';
import Style from 'style/MainStyle';
import TextInput from 'component/TextInput';

class Comparator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: false,
            value: '',
            latest: props.latest || 0,
            tempValue: ''
        };
        this.checkHandler = this.checkHandler.bind(this);
        this.changeTextHandler = this.changeTextHandler.bind(this);
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            latest: nextProps.latest
        });
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
                <ListItem>
                    <CheckBox onPress={this.checkHandler} checked={this.state.checked} />
                    <Body>
                        <Text>Use Latest Rate</Text>
                    </Body>
                </ListItem>
            </View>
        );
    }
}

export default Comparator;