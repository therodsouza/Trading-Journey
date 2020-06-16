import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import * as actions from '../../store/actions/index';

import Button from 'react-bootstrap/Button';
import Modal from '../UI/Modal/Modal';
import SessionWizard from '../SessionWizard/SessionWizard';
import SessionInfo from '../SessionInfo/SessionInfo';
import TradingZone from '../TradingZone/TradingZone';
import CloseSession from '../CloseSession/CloseSession';

import classes from './cockpit.module.css';
import axios from '../../axios';

const Cockpit = props => {

    const token = props.token;
    const userId = props.userId;
    const onSessionRestore = props.onSessionRestore;

    useEffect(() => {
        onSessionRestore(token);
    }, [token, onSessionRestore]);

    const [newSession, setNewSession] = useState(false);
    const [endingSession, setEndingSession] = useState(false);

    const onSessionEndedHandler = (comments) => {
        props.onSessionEnded({ ...props.session, comments: comments }, token);
        props.history.push('/journal');
    }

    const onSessionCreatedHandler = (session) => {
        props.onSessionCreated(session, token, userId);
        setNewSession(false)
    }

    const sessionInfo = props.isSessionActive ? <SessionInfo /> : null;
    const tz = props.isSessionActive ? <TradingZone /> : null;

    return (
        <div className={classes.Cockpit}>
            <Button variant="dark" onClick={() => setNewSession(true)}
                disabled={props.isSessionActive}>New Session</Button>{' '}
            <Button variant="dark" onClick={() => setEndingSession(true)}
                disabled={!props.isSessionActive}>End Session</Button>
            <Modal show={newSession && !props.isSessionActive} modalClosed={() => setNewSession(false)} >
                <SessionWizard onSessionCreated={onSessionCreatedHandler} />
            </Modal>
            <Modal show={endingSession} modalClosed={() => setEndingSession(false)} >
                <CloseSession onSessionClosed={onSessionEndedHandler} />
            </Modal>
            {sessionInfo}
            {tz}
        </div>
    );
};

const mapStatetoProps = state => {
    return {
        isSessionActive: state.tradingSession.session.active,
        session: state.tradingSession.session,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSessionCreated: (session, token, userId) => dispatch(actions.createSession(session, token, userId)),
        onSessionEnded: (session, token) => dispatch(actions.endSession(session, token)),
        onSessionRestore: (token) => dispatch(actions.restoreSession(token))
    }
}

export default connect(mapStatetoProps, mapDispatchToProps)(withErrorHandler(Cockpit, axios));