/**
* @providesModule component/Header
*/

import React, { Component } from 'react';
import { Header, Left, Button, Body, Right, Icon, Title } from 'native-base';

class HeaderUniversal extends Component {
    constructor() {
        super();
        this.toggleDrawer = this.toggleDrawer.bind(this);
    }
    toggleDrawer() {
        this.props.navigation.navigate('DrawerToggle');        
    }
    render() {
        return (
            <Header>
                <Left>
                    <Button transparent onPress={this.toggleDrawer}>
                        <Icon name='menu' />
                    </Button>
                </Left>
                <Body>
                    <Title>Header</Title>
                </Body>
                <Right>
                    <Button transparent>
                        <Icon name='arrow-back' />
                    </Button>
                </Right>
            </Header>
        );
    }
}

export default HeaderUniversal;