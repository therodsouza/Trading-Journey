import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import StepWizard from 'react-step-wizard';
import * as actions from '../../store/actions/index';

import SessionParameters from '../SessionWizard/SessionParameters/SessionParameters';
import RiskParameters from '../SessionWizard/RiskParameters/RiskParameters';


const SessionWizard = props => {

    useEffect(() => {
        console.log('SESSION_WIZARD');
    });

    return (
        <div>
            <h3>New trading session wizard</h3>
            <StepWizard >
                <SessionParameters />
                <RiskParameters onStart={props.onSessionCreated}/>

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
        onSessionCreated: (session) => dispatch(actions.createSession(session))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SessionWizard);