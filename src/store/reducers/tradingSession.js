import * as actionTypes from '../actions/actionTypes';

import { updateObject } from '../../util/utility';

const initialState = {
    id: null,
    session: null,
    startDateTime: null,
    endDateTime: null
}

const createSession = (state, action) => {
    return updateObject(state, { session: action.session, startDateTime: Date.now() });
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