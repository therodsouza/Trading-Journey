import * as actionTypes from '../actions/actionTypes';

import { updateObject } from '../../util/utility';

const initialState = {
    session: {
        sessionId: null,
        profitTarget: 0,
        maxLoss: 0,
        stopLosses: 0,
        maxDrawdown: 0,
        startDateTime: null,
        endDateTime: null,
        active: false
    }
}

const createSessionSuccess = (state, action) => {
    return updateObject(state,
        {
            session: {
                sessionId: action.sessionId,
                ...action.session
            }
        });
}

const createSessionFailed = (state, action) => {
    return {
        ...state
    }
}

const endSessionSuccess = (state, action) => {
    return updateObject(state,
        {
            session: {
                ...state.session,
                active: action.session.active,
                endDateTime: action.session.endDateTime

            }
        });
}

const endSessionFailed = (state, action) => {
    return updateObject(state,
        {
            session: {
                ...state.session,
                endDateTime: Date.now(),
                error: action.error
            }
        });
}

const cancelSession = (state, action) => {
    return updateObject(state, initialState);
}

const restoreSessionSuccess = (state, action) => {
    return updateObject(state,
        {
            session: {
                sessionId: action.sessionId,
                ...action.session
            }
        });
}

const calculatePerformance = (state, action) => {
    return {
        session: {
            ...state.session,
            ...action.performance
        }
    };
}

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case actionTypes.CREATE_SESSION_SUCCESS: return createSessionSuccess(state, action);
        case actionTypes.CREATE_SESSION_FAILED: return createSessionFailed(state, action);
        case actionTypes.END_SESSION_SUCCESS: return endSessionSuccess(state, action);
        case actionTypes.END_SESSION_FAILED: return endSessionFailed(state, action);
        case actionTypes.CANCEL_SESSION: return cancelSession(state, action);
        case actionTypes.RESTORE_SESSION_SUCCESS: return restoreSessionSuccess(state, action);
        case actionTypes.CALCULATE_PERFORMANCE: return calculatePerformance(state, action);
        default: return state;
    }
};

export default reducer;