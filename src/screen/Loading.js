/**
* @providesModule screen/Loading
*/

import React, { Component } from 'react';
import { Text, View } from 'react-native';
import Style from 'style/MainStyle';

class Loading extends Component {
    render() {
        return (
            <View style={Style.container}>
                <Text>Loading...</Text>
            </View>
        );
    }
}

export default Loading;