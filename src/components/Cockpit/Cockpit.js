import React, { useState, useEffect } from 'react';

import Button from 'react-bootstrap/Button';
import Modal from '../UI/Modal/Modal';
import SessionWizard from '../SessionWizard/SessionWizard';
import SessionInfo from '../SessionInfo/SessionInfo';
import TradingZone from '../TradingZone/TradingZone';
import CloseSession from '../CloseSession/CloseSession';

import classes from './cockpit.module.css';
import { connect } from 'react-redux';

import * as actions from '../../store/actions/index';

const Cockpit = props => {

    const onSessionRestore = props.onSessionRestore;

    useEffect(() => {
        onSessionRestore();
    }, [onSessionRestore]);

    const [newSession, setNewSession] = useState(false);
    const [endingSession, setEndingSession] = useState(false);

    const onSessionEndedHandler = (comments) => {
        const { sessionId } = props.session;

        props.onSessionEnded({ sessionId: sessionId, comments: comments });
        props.history.push('/journal');
    }

    const onSessionCreatedHandler = (session) => {
        props.onSessionCreated(session);
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
        session: state.tradingSession.session
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSessionCreated: (session) => dispatch(actions.createSession(session, 'XXX')),
        onSessionEnded: (session) => dispatch(actions.endSession(session, 'XXX')),
        onSessionRestore: () => dispatch(actions.restoreSession())
    }
}

export default connect(mapStatetoProps, mapDispatchToProps)(Cockpit);