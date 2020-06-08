import * as actionTypes from './actionTypes';

import axios from '../../axios';

export const activateTrade = (trade) => {

    return dispatch => {
        axios.post('/trades.json', trade)
            .then(response => {
                dispatch(activateTradeSuccess(response.data, trade));
                dispatch(fetchTrades(trade.session));
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
        axios.get('/trades.json?orderBy="session"&equalTo="' + sessionId + '"&orderBy="startDateTime"')
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

export const closePosition = (trade) => {
    return dispatch => {

        const { id } = trade;
        const patch = {
            priceOut: trade.priceOut,
            reason: trade.reason,
            tags: trade.tags,
            closeDateTime: Date.now(),
            status: 'Closed'
        }

        axios.patch('/trades/' + id + '.json', patch)
            .then(response => {
                dispatch(closePositionSuccess(id, response.data));
            })
            .catch(error => {
                dispatch(closePositionFailed(id, error));
            });
    }
}

export const closePositionSuccess = (id, trade) => {
    return {
        type: actionTypes.CLOSE_POSITION_SUCCESS,
        closedtrade: trade,
        id: id
    }
}

export const closePositionFailed = (id, error) => {
    return {
        type: actionTypes.CLOSE_POSITION_FAILED,
        error: error,
        id: id
    }
}