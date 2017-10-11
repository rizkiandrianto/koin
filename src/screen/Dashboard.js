/**
* @providesModule screen/Dashboard
*/

import React, { Component } from 'react';
import {
    View,
    Text,
  } from "react-native";
import { connect } from 'react-redux';
import Style from 'style/MainStyle';

class Dashboard extends Component {
    static navigationOptions = { header: null };
    constructor(props) {
        super(props);
    }
    renderList() {
        // console.log('=== MARKET', this.props.market);
        return this.props.market.map((key, index)=>{
            return <Text key={key.id}>{key.name} {parseFloat(key.price_idr).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</Text>;
        });
    }
    render() {
        return (
            <View style={Style.container}>
                {this.renderList()}
            </View>
        )
    }
}

export default connect(
    state => ({
        market: state.Main.market
    })
)(Dashboard);