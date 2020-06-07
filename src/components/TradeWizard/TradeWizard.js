import React, { useState } from 'react';
import StepWizard from 'react-step-wizard';

import ContextParameters from './ContextParameters/ContextParameters';
import StrategyParameters from './StrategyParameters/StrategyParameters';

const TradeWizard = props => {

    const [contextParameters, setContextParameters] = useState(null);

    const side = props.type === 'Buy' ? 'Long' : 'Short';

    const tradeActivatedHandler = (strategyParameters) => {
        const trade = {
            ...contextParameters, ...strategyParameters, side: side
        }

        setContextParameters(null);
        props.onTradeActivated(trade);
    }

    return (
        <div>
            <h4>{props.type}</h4>
            <StepWizard>
                <ContextParameters onComplete={setContextParameters} />
                <StrategyParameters onComplete={tradeActivatedHandler} />
            </StepWizard>
        </div>
    );
};

export default TradeWizard;