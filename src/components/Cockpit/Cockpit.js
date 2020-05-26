import React, { useState } from 'react';

import Button from '../UI/Button/Button';
import Modal from '../UI/Modal/Modal';
import SessionWizard from '../SessionWizard/SessionWizard';
import SessionInfo from '../SessionInfo/SessionInfo';

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

    return (
        <div className={classes.Cockpit}>
            <Button btnType="Success" onClick={newSessionHandler}
                disabled={props.isSessionActive}>New Session</Button>
            <Button btnType="Danger" onClick={newSessionHandler}
                disabled={!props.isSessionActive}>End Session</Button>
            <Modal show={newSession && !props.isSessionActive} modalClosed={newSessionCancelHandler} >
                <SessionWizard />
            </Modal>
            <SessionInfo />
        </div>
    );
};

const mapStatetoProps = state => {
    return {
        isSessionActive: state.active
    }
}

export default connect(mapStatetoProps)(Cockpit);