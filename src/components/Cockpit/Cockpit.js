import React, { useState } from 'react';

import Button from '../UI/Button/Button';
import Modal from '../UI/Modal/Modal';
import SessionWizard from '../SessionWizard/SessionWizard';
import classes from './cockpit.module.css';

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
            <Button btnType="Danger" onClick={newSessionHandler}>New Session</Button>
            <Modal show={newSession} modalClosed={newSessionCancelHandler} >
                <SessionWizard />
            </Modal>
        </div>
    );
};

export default Cockpit