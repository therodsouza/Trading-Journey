import * as actionTypes from './actionTypes';
import axios from '../../axios';
import { tradeComparator } from '../../util/utility';

export const activateTrade = (trade, token) => {

    return dispatch => {
        axios.post('/trades.json?auth=' + token, trade)
            .then(response => {
                dispatch(activateTradeSuccess(response.data, trade));
                dispatch(fetchTrades(trade.session, token));
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

export const fetchTrades = (sessionId, token) => {
    return dispatch => {
        axios.get('/trades.json?auth=' + token + '&orderBy="session"&equalTo="' + sessionId + '"')
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
                
                const orderedTrades = fetchedTrades.sort(tradeComparator);

                dispatch(fetchTradesSuccess(orderedTrades));              
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

export const closePosition = (trade, token) => {
    return dispatch => {

        const { id } = trade;
        const patch = {
            priceOut: trade.priceOut,
            reason: trade.reason,
            tags: trade.tags,
            closeDateTime: Date.now(),
            status: 'Closed'
        }

        axios.patch('/trades/' + id + '.json?auth=' + token, patch)
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