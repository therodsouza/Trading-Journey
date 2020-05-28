import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import StepWizard from 'react-step-wizard';
import * as actions from '../../store/actions/index';

import SessionParameters from '../SessionWizard/SessionParameters/SessionParameters';
import RiskParameters from '../SessionWizard/RiskParameters/RiskParameters';


const SessionWizard = props => {

    const [sessionParameters, setSessionParameters] = useState(null);

    useEffect(() => {
        console.log('SESSION WIZARD');
    });

    const sessionCreatedHandler = (riskParameters) => {
        const session = {
            ...sessionParameters, ...riskParameters
        }
        props.onSessionCreated(session);
    }

    return (
        <div>
            <h3>New trading session wizard</h3>
            <StepWizard >
                <SessionParameters onComplete={setSessionParameters} />
                <RiskParameters onComplete={sessionCreatedHandler} />
            </StepWizard>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        session: state
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onSessionCreated: (session) => dispatch(actions.createSession(session, 'XXX'))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SessionWizard);