/**
 * @providesModule redux/action/MainAction
 */

export function setIncreaseCounter() {
    return {
        type: 'SET_INCREASE_COUNTER'
    }
}

export function setCurrency(value) {
    return {
        type: 'SET_CURRENCY',
        value
    }
}

export function setCoin(value) {
    return {
        type: 'SET_COIN',
        value
    }
}

export function setMarket(value) {
    return {
        type: 'SET_MARKET',
        value
    }
}