import * as actionTypes from '../actions/actionTypes';

import { updateObject } from '../../util/utility';

const initialState = {
    trade: null,
    trades: null
}

const activateTradeSuccess = (state, action) => {
    console.log(action);
    return state;
}

const fetchTradesSuccess = (state, action) => {
    return updateObject(state, { trades: action.trades });
}

const closePositionSuccess = (state, action) => {

    return {
        trades: state.trades.map(trade => {
            if (trade.id === action.id) {
                trade = updateObject(trade, action.closedtrade)
            }

            return trade;
        })
    }
}

const closePositionFailed = (state, action) => {
    console.log(action);
    return state;
}

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case actionTypes.ACTIVATE_TRADE_SUCCESS: return activateTradeSuccess(state, action);
        case actionTypes.FETCH_TRADES_SUCCESS: return fetchTradesSuccess(state, action);
        case actionTypes.CLOSE_POSITION_SUCCESS: return closePositionSuccess(state, action);
        case actionTypes.CLOSE_POSITION_FAILED: return closePositionFailed(state, action);
        default: return state;
    }
}

export default reducer;