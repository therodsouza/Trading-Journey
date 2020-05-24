import React from 'react';
import StepWizard from 'react-step-wizard';

import SessionParameters from '../SessionWizard/SessionParameters/SessionParameters';
import RiskParameters from '../SessionWizard/RiskParameters/RiskParameters';

const sessionWizard = props => {

    return (
        <div>
            <h3>New trading session wizard</h3>
            <StepWizard>
                <SessionParameters />
                <RiskParameters />

            </StepWizard>
        </div>
    );
};


export default sessionWizard;