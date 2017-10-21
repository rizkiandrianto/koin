/**
* @providesModule component/TextInput
*/

import React, { Component } from 'react';
import { TextInput, StyleSheet} from 'react-native';

const style = StyleSheet.create({
    text: {
        backgroundColor: 'transparent',
        height: 40,
        paddingLeft: 10,
        shadowColor: "black",
        shadowOpacity: 1,
        shadowRadius: 2,
        shadowOffset: {
          height: 0,
          width: 0,
        },
    }
});

class Text extends Component {
    render() {
        return (
            <TextInput {...this.props} style={style.text}/>
        );
    }
}

export default Text;