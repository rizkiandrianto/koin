/**
* @providesModule helper/MoneyFormater
*/

export default function(value=0, indent=2) {
    if (value) {
        return parseFloat(value).toFixed(indent).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
    }
    return value;
}