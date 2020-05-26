import React, { useState } from 'react';

import Button from 'react-bootstrap/Button';
import Modal from '../UI/Modal/Modal';
import SessionWizard from '../SessionWizard/SessionWizard';
import SessionInfo from '../SessionInfo/SessionInfo';
import Trades from '../Trades/Trades';

import classes from './cockpit.module.css';
import { connect } from 'react-redux';

const Cockpit = props => {

    const [newSession, setNewSession] = useState(false);

    const newSessionHandler = () => {
        setNewSession(true);
    }

    const newSessionCancelHandler = () => {
        setNewSession(false);
    }

    const sessionInfo = props.isSessionActive ? <SessionInfo /> : null;

    const trades = props.isSessionActive ? <Trades /> : null;


    return (
        <div className={classes.Cockpit}>
            <Button variant="dark" onClick={newSessionHandler}
                disabled={props.isSessionActive}>New Session</Button>{' '}
            <Button variant="dark" onClick={newSessionHandler}
                disabled={!props.isSessionActive}>End Session</Button>
            <Modal show={newSession && !props.isSessionActive} modalClosed={newSessionCancelHandler} >
                <SessionWizard />
            </Modal>
            { sessionInfo }
            { trades }
            
        </div>
    );
};

const mapStatetoProps = state => {
    return {
        isSessionActive: state.active
    }
}

export default connect(mapStatetoProps)(Cockpit);