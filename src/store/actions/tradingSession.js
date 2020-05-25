import * as actionTypes from './actionTypes';

export const createSession = (session) => {
    return {
        type: actionTypes.CREATE_SESSION,
        session: session
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