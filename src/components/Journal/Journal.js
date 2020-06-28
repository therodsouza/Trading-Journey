import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import Calendar from './Calendar/Calendar';
import * as actions from '../../store/actions/index';
import classes from './journal.module.css';

import axios from '../../axios';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import JournalEntries from './JournalEntries/JournalEntries';
import Modal from '../UI/Modal/Modal';
import TradeList from './TradeList/TradeList';

const Journal = props => {

    const sessions = props.sessions;
    const userId = props.userId;
    const token = props.token;
    const onFetchSessions = props.onFetchSessions;
    const onFetchTrades = props.onFetchTrades;

    useEffect(() => {
        onFetchSessions(userId, token);
    }, [userId, token, onFetchSessions]);

    const [selectedEntry, setSelectedEntry] = useState(null);
    const [selectedSession, setSelectedSession] = useState(null);

    const clickEntryHandler = (data, index) => {
        const sessionArray = heatmap.get(data.date.toDateString());
        if (sessionArray) {
            setSelectedEntry(sessionArray.map(session => session.id));
        }
    }

    const selectedSessionHandler = (sessionId) => {
        setSelectedSession(sessionId);
    }

    useEffect(() => {
        onFetchTrades(selectedSession, token);
    }, [selectedSession, token, onFetchTrades])

    const heatmap = new Map();

    sessions.forEach(session => {

        if (session.profit) {
            const date = new Date(session.startDateTime).toDateString();
            const sessionArray = heatmap.get(date);

            if (sessionArray) {
                sessionArray.push({ id: session.id, count: session.profit });
            } else {
                heatmap.set(date, [{ id: session.id, count: session.profit }]);
            }
        }
    });

    const journalEntries = [];

    if (selectedEntry) {
        for (let index in selectedEntry) {
            const session = props.sessions.find(s => s.id === selectedEntry[index]);
            journalEntries.push(session)
        }
    }

    return (
        <div className={classes.Journal}>
            <Calendar heatmap={heatmap} onClick={clickEntryHandler} />
            <JournalEntries entries={journalEntries} onShowTrades={selectedSessionHandler} />
            <Modal show={selectedSession} modalClosed={() => setSelectedSession(null)} >
                <TradeList title={'Session ' + selectedSession} trades={props.trades} />
            </Modal>
        </div>)
}

const mapStateToProps = state => {
    return {
        sessions: state.journal.sessions,
        trades: state.trade.trades,
        userId: state.auth.userId,
        token: state.auth.token
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchSessions: (userId, token) => dispatch(actions.fetchSessions(userId, token)),
        onFetchTrades: (sessionId, token) => dispatch(actions.fetchTrades(sessionId, token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Journal, axios));