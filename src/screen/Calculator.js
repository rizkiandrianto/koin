/**
* @providesModule screen/Calculator
*/

import React, { Component } from 'react';
import { StyleSheet, ScrollView, Text } from 'react-native';
import { Picker, Content, Form, Item as FormItem } from 'native-base';
import {Grid, Col, Row} from 'react-native-easy-grid';
import { connect } from 'react-redux';
import Comparator from 'component/Comparator';
import Style from 'style/MainStyle';
import TextInput from 'component/TextInput';
import MoneyFormater from 'helper/MoneyFormater';
const Item = Picker.Item;
const style = StyleSheet.create({
    textContainer: {
        flex: 1,
        marginTop: 30,
        flexDirection: 'column',
        padding: 10
    },
    firstRow: {
        height: 50,
        marginTop: 30
    },
    rowComparator: {
        height: 100
    },
    text: {
        width: '100%'
    }
});

class Calculator extends Component {
    static navigationOptions = { header: null };
    constructor() {
        super();
        this.state = {
            buy: 0,
            sell: 0,
            balance: 0,
            selectedCurrency: undefined,
            selectedCoin: undefined
        }
        this.changeTextHandler = this.changeTextHandler.bind(this);
        this.onChangeCoin = this.onChangeCoin.bind(this);
        this.onChangeCurrency = this.onChangeCurrency.bind(this);
    }
    onChangeCoin(value) {
        this.setState({
            selectedCoin: value
        });
    }
    onChangeCurrency(value) {
        this.setState({
            selectedCurrency: value
        });
    }
    changeTextHandler(type) {
        return (value) => {
            this.setState({
                [type]: value
            });
        };
    }
    countCoin(amount = 0, buy = 0) {
        amount = this.state.balance && this.state.balance != '' ? this.state.balance : amount;
        buy = this.state.buy && this.state.buy != '' ? this.state.buy : buy;
        return amount / buy;
    }
    countFinalBalance(sell = 0, amount = 0) {
        sell = this.state.sell && this.state.sell != '' ? this.state.sell : sell;
        amount = this.countCoin();
        return sell * amount;
    }
    countProfit() {
        return this.countFinalBalance() - this.state.balance;
    }
    render() {
        return (
            <Content style={{backgroundColor: '#fff'}}>
                <Grid>
                    <Row style={style.textContainer}>
                        <Text style={style.text}>Balance: {MoneyFormater(this.state.balance)}</Text>
                        <Text style={style.text}>Balance (coin): {MoneyFormater(this.countCoin(), 5)}</Text>
                        <Text style={style.text}>Buy: {MoneyFormater(this.state.buy)}</Text>
                        <Text style={style.text}>Sell: {MoneyFormater(this.state.sell)}</Text>
                        <Text style={style.text}>Jumlah uang yg didapat: {MoneyFormater(this.countFinalBalance())}</Text>
                        <Text style={style.text}>Profit: {MoneyFormater(this.countProfit())}</Text>
                    </Row>
                    <Row>
                        <Col>
                            <Row>
                                <Text>Select Currency</Text>
                            </Row>
                            <Row>
                                <Picker
                                    style={{width: 200}}
                                    mode="dropdown"
                                    placeholder="Select One"
                                    selectedValue={this.state.selectedCoin}
                                    onValueChange={this.onChangeCoin}
                                >
                                    <Item label="IDR" value="idr" />
                                    <Item label="USD" value="usd" />
                                </Picker>
                            </Row>
                        </Col>
                        <Col>
                            <Row>
                                <Text>Select Coin</Text>
                            </Row>
                            <Row>
                                <Picker
                                    style={{width: 200}}
                                    mode="dropdown"
                                    placeholder="Select One"
                                    selectedValue={this.state.selectedCoin}
                                    onValueChange={this.onChangeCoin}
                                >
                                    <Item label="Bitcoin (BTC)" value="btc" />
                                    <Item label="Ripple (XRP)" value="xrp" />
                                    <Item label="ZCoin (XZC)" value="xzc" />
                                    <Item label="Stellar Lumen (XLM)" value="xlm" />
                                </Picker>
                            </Row>
                        </Col>
                    </Row>
                    <Row style={style.firstRow}>
                        <Col style={{width: '100%', padding: 10, marginBottom: 30}}>
                            <TextInput 
                                style={Style.text} 
                                placeholder="Input balance"
                                keyboardType="numeric"
                                onChangeText={this.changeTextHandler('balance')}
                            />
                        </Col>
                    </Row>
                    <Row style={style.rowComparator}>
                        <Comparator onChange={this.changeTextHandler('buy')}
                            latest={this.state.selectedCoin && this.props.market.find(x => x.symbol == this.state.selectedCoin.toUpperCase()).price_idr}
                        />
                    </Row>
                    <Row style={style.rowComparator}>
                        <Comparator onChange={this.changeTextHandler('sell')} 
                            latest={this.state.selectedCoin && this.props.market.find(x => x.symbol == this.state.selectedCoin.toUpperCase()).price_idr}/>
                    </Row>
                </Grid>
            </Content>
        );
    }
}

export default connect(
    state => ({
        market: state.Main.market
    })
)(Calculator);