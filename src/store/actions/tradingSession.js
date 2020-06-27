import * as actionTypes from './actionTypes';

import axios from '../../axios';

import { calculateProfit } from '../../service/trade/trade';

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

export const createSession = (session, token, userId) => {

    const sessionData = {
        ...session,
        startDateTime: Date.now(),
        active: true,
        userId: userId
    }

    return dispatch => {
        axios.post('/sessions.json?auth=' + token, sessionData)
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
        const { sessionId, profit, winners, losers, winrate,
            overallCosts, volume, maxSequenceWinners,
            maxSequenceLosers, drawdown, comments } = session;
        const patch = {
            active: false,
            endDateTime: Date.now(),
            profit: profit,
            winners: winners,
            losers: losers,
            winrate: winrate,
            overallCosts: overallCosts,
            volume: volume,
            maxSequenceWinners: maxSequenceWinners,
            maxSequenceLosers: maxSequenceLosers,
            drawdown: drawdown,
            comments: comments
        }

        axios.patch('/sessions/' + sessionId + '.json?auth=' + token, patch)
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
    return {
        type: actionTypes.RESTORE_SESSION_FAILED,
        error: error
    }
}

export const restoreSession = (token) => {

    return dispatch => {
        axios.get('/sessions.json?auth=' + token + '&orderBy="active"&equalTo=true')
            .then(response => {
                dispatch(restoreSessionSuccess(response.data));
            })
            .catch(error => {
                dispatch(restoreSessionFailed(error.message));
            });
    }
}

export const calculatePerformance = (trades) => {

    let maxPL = 0;
    let minPL = null;
    let overallPL = 0;
    let overallCosts = 0;
    let winners = 0;
    let losers = 0;
    let rowLosers = 0;
    let maxSequenceLosers = 0;
    let rowWinners = 0;
    let maxSequenceWinners = 0;
    let volume = 0;

    trades.filter(trade => {
        return trade.status === 'Closed'
    }).map(trade => {

        const pL = calculateProfit(trade);

        if (pL > 0) {
            winners++;
            rowWinners++
            rowLosers = 0;
        } else {
            losers++;
            rowLosers++;
            rowWinners = 0;
        }

        maxSequenceWinners = maxSequenceWinners < rowWinners ? rowWinners : maxSequenceWinners;
        maxSequenceLosers = maxSequenceLosers < rowLosers ? rowLosers : maxSequenceLosers;

        overallPL += pL;
        overallCosts += trade.volume * 0.5; // FIXME based on asset class
        volume += trade.volume * 1;

        maxPL = maxPL < overallPL ? overallPL : maxPL;
        minPL = minPL > overallPL ? overallPL : minPL;
        return trade;
    });

    const profit = overallPL - overallCosts;
    const winrate = (winners / (losers + winners)) * 100;
    const drawdown = (minPL - maxPL);

    return {
        type: actionTypes.CALCULATE_PERFORMANCE,
        performance: {
            profit: profit,
            winners: winners,
            losers: losers,
            winrate: winrate,
            volume: volume,
            overallCosts: overallCosts,
            maxSequenceWinners: maxSequenceWinners,
            maxSequenceLosers: maxSequenceLosers,
            drawdown: drawdown
        }
    }
}