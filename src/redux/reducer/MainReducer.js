/**
 * @providesModule redux/reducer/MainReducer
 */

import store from 'redux/store/MainStore';

export default function(state=store, action) {
    switch (action.type) {
        case 'SET_INCREASE_COUNTER':
            return {
                ...state,
                counter: state.counter+1
            };
            break;
        case 'SET_CURRENCY':
            return {
                ...state,
                currency: action.value
            };
            break;
        case 'SET_COIN':
            return {
                ...state,
                coin: action.value
            };
            break;
        case 'SET_MARKET':
            return {
                ...state,
                market: action.value
            };
            break;
        default:
            return {
                ...state
            };
            break;
    }
}