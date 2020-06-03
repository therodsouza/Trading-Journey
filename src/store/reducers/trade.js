import * as actionTypes from '../actions/actionTypes';

import { updateObject } from '../../util/utility';

const initialState = {
    trade: null
}

const activateTradeSuccess = (state, action) => {
    console.log(action);
    return state;
}

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case actionTypes.ACTIVATE_TRADE_SUCCESS: return activateTradeSuccess(state, action);
        default: return state;
    }
}

export default reducer;