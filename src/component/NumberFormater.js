/**
* @providesModule component/NumberFormater
*/

import React, { Component } from 'react';
import { FormattedCurrency } from 'react-native-globalize';

class NumberFormat extends Component {
    render() {
        return (
            <FormattedCurrency value={this.props.value} currency="USD"/>
        );
    }
}

NumberFormat.defaultProps = {
    value: 0
};

export default NumberFormat;