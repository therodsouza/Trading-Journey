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

export const endSessionSuccess = (data) => {
    return {
        type: actionTypes.END_SESSION_SUCCESS,
        session: data
    }
}

export const endSessionFailed = (error) => {
    return {
        type: actionTypes.END_SESSION_FAILED,
        error: error
    }
}

export const endSession = (session, token) => {

    return dispatch => {
        const { sessionId } = session;
        const patch = {
            active: false,
            endDateTime: Date.now(),
        }

        axios.patch('/sessions/' + sessionId + '.json', patch)
            .then(response => {
                dispatch(endSessionSuccess(response.data));
            })
            .catch(error => {
                dispatch(endSessionFailed(error.message));
            });
    }
}

export const restoreSessionSuccess = (data) => {

    const sessionId = Object.keys(data)[0];
    const session = data[sessionId];

    return {
        type: actionTypes.RESTORE_SESSION_SUCCESS,
        sessionId: sessionId,
        session: session
    }
}

export const restoreSessionFailed = (error) => {
    console.log(error);
}

export const restoreSession = () => {

    return dispatch => {
        axios.get('/sessions.json?orderBy="active"&equalTo=true')
            .then(response => {
                dispatch(restoreSessionSuccess(response.data));
            })
            .catch(error => {
                dispatch(restoreSessionFailed(error));
            });
    }
}