import React, { useState } from 'react';
import StepWizard from 'react-step-wizard';

import ContextParameters from './ContextParameters/ContextParameters';
import StrategyParameters from './StrategyParameters/StrategyParameters';

const TradeWizard = props => {

    const [contextParameters, setContextParameters] = useState(null);

    const tradeActivatedHandler = (strategyParameters) => {
        const trade = {
            ...contextParameters, ...strategyParameters
        }
    }

    return (
        <div>
            <h3>{props.type}</h3>
            <StepWizard>
                <ContextParameters onComplete={setContextParameters} />
                <StrategyParameters onComplete={tradeActivatedHandler} />
            </StepWizard>
        </div>
    );
};

export default TradeWizard;