import * as actionTypes from './actionTypes';

import axios from '../../axios';

export const activateTrade = (trade) => {

    return dispatch => {
        axios.post('/trades.json', trade)
            .then(response => {
                dispatch(activateTradeSuccess(response.data, trade))
            })
            .catch(error => {
                dispatch(activateTradeFailed(error));
            })
    }
}

export const activateTradeSuccess = (data) => {
    console.log(data);

    return {
        type: actionTypes.ACTIVATE_TRADE_SUCCESS,
        trade: data
    }
}

export const activateTradeFailed = (error) => {
    console.log(error);

    return {
        type: actionTypes.ACTIVATE_TRADE_FAILED,
        error: error
    }
}