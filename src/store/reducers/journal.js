import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../util/utility';

const initialState = {
    sessions: []
}

const fetchSessionsSuccess = (state, action) => {
    return updateObject(state, { sessions: action.sessions });
}

const fetchSessionsFailed = (state, action) => {
    return state; 
}

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case actionTypes.FETCH_SESSIONS_SUCCESS: return fetchSessionsSuccess(state, action);
        case actionTypes.FETCH_SESSIONS_FAILED: return fetchSessionsFailed(state, action);
        default: return state
    }
};

export default reducer;