import * as actionTypes from './actionTypes';
import axios from '../../axios';
import { sessionComparator } from '../../util/utility';

export const fetchSessions = (token) => {
    return dispatch => {
        axios.get('/sessions.json?auth=' + token + '&orderBy="active"&equalTo=false')
            .then(response => {
                const fetchedSessions = [];
                for (let key in response.data) {
                    fetchedSessions.push(
                        {
                            ...response.data[key],
                            id: key
                        }
                    )
                }
                
                dispatch(fetchSessionsSuccess(fetchedSessions.sort(sessionComparator)));
            })
            .catch(error => {
                dispatch(fetchSessionsFailed(error.message));
            });
    }
}

const fetchSessionsSuccess = sessions => {
    return {
        type: actionTypes.FETCH_SESSIONS_SUCCESS,
        sessions: sessions
    }
}

const fetchSessionsFailed = error => {
    return {
        type: actionTypes.FETCH_SESSIONS_FAILED,
        error: error
    }
}