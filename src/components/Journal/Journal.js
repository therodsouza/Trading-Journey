import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import Calendar from './Calendar/Calendar';
import * as actions from '../../store/actions/index';
import classes from './journal.module.css';

import axios from '../../axios';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const Journal = props => {

    const sessions = props.sessions;
    const token = props.token;
    const onFetchSessions = props.onFetchSessions;

    useEffect(() => {
        onFetchSessions(token);
    }, [token, onFetchSessions]);

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

    return (
        <div className={classes.Journal}>
            <Calendar heatmap={heatmap} />

        </div>)
}

const mapStateToProps = state => {
    return {
        sessions: state.journal.sessions,
        token: state.auth.token
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchSessions: (token) => dispatch(actions.fetchSessions(token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Journal, axios));