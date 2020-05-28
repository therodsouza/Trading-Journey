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
            .then(response => {
                dispatch(createSessionSuccess(response.data.name, sessionData))
            })
            .catch(error => {
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

export const endSessionSuccess = (session) => {
    return {
        type: actionTypes.END_SESSION_SUCCESS,
        session: session
    }
}

export const endSessionFailed = (session, error) => {
    return {
        type: actionTypes.END_SESSION_FAILED,
        session: session,
        error: error
    }
}

export const endSession = (session, token) => {

    return dispatch => {
        const { sessionId } = session;
        const patch = {
            active: false
        }

        axios.patch('/sessions/' + sessionId + '.json', patch)
            .then(response => {
                dispatch(endSessionSuccess(session));
            })
            .catch(error => {
                dispatch(endSessionFailed(session, error.message));
            });
    }
}