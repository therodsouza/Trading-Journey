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

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case actionTypes.ACTIVATE_TRADE_SUCCESS: return activateTradeSuccess(state, action);
        case actionTypes.FETCH_TRADES_SUCCESS: return fetchTradesSuccess(state, action);
        default: return state;
    }
}

export default reducer;