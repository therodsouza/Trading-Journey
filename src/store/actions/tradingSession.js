import * as actionTypes from './actionTypes';

import axios from '../../axios';

export const createSessionSuccess = (id, session) => {
    return {
        type: actionTypes.CREATE_SESSION_SUCCESS,
        sessionId: id,
        session: session
    };
};

export const createSessionFailed = (error) => {
    return {
        type: actionTypes.CREATE_SESSION_FAILED,
        error: error
    };
};

export const createSession = (session, token) => {

    const sessionData = {
        ...session,
        startDateTime: Date.now(),
        active: true
    }

    return dispatch => {
        axios.post('/sessions.json', sessionData)
        .then( response => {
            dispatch(createSessionSuccess(response.data, sessionData))
        })
        .catch( error => {
            dispatch(createSessionFailed(error));
        })
    }
}

export const cancelSession = (session) => {
    return {
        type: actionTypes.CANCEL_SESSION,
        session: session
    }
}

export const endSession = (session) => {
    return {
        type: actionTypes.END_SESSION,
        session: session
    }
}