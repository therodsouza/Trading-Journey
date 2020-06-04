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

export const fetchTrades = (sessionId) => {
    return dispatch => {
        axios.get('/trades.json?orderBy="session"&equalTo="' + sessionId + '"')
            .then(response => {
                const fetchedTrades = [];
                for (let key in response.data) {
                    fetchedTrades.push(
                        {
                            ...response.data[key],
                            id: key
                        }
                    )
                }
                dispatch(fetchTradesSuccess(fetchedTrades));
            })
            .catch(error => {
                dispatch(fetchTradesFailed(error));
            });
    }
}

export const fetchTradesSuccess = (trades) => {
    return {
        type: actionTypes.FETCH_TRADES_SUCCESS,
        trades: trades
    }
}

export const fetchTradesFailed = (error) => {
    console.log(error);
    return {
        type: actionTypes.FETCH_TRADES_FAILED,
        error: error
    }
}