import * as actionTypes from '../actions/actionTypes';

import { updateObject } from '../../util/utility';

const initialState = {
    id: null,
    session: {
        profitTarget: 0,
        maxLoss: 0,
        stopLosses: 0,
        maxDrawdown: 0
    },
    startDateTime: null,
    endDateTime: null,
    active: false
}

const createSession = (state, action) => {
    return updateObject(state, { session: action.session, startDateTime: Date.now(), active: true });
}

const endSession = (state, action) => {
    return updateObject(state, { endDateTime: Date.now() });
}

const cancelSession = (state, action) => {
    return updateObject(state, initialState);
}

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case actionTypes.CREATE_SESSION: return createSession(state, action);
        case actionTypes.END_SESSION: return endSession(state, action);
        case actionTypes.CANCEL_SESSION: return cancelSession(state, action);
        default: return state;
    }

};

export default reducer;