import React from 'react';
import { connect } from 'react-redux';

const SessionInfo = props => {

    return (
        <div>
            <p>Session information</p>
            <p>{props.sessionStartDateTime}</p>
            <p>{props.profitTarget}</p>
            <p>{props.maxLoss}</p>
            <p>{props.stopLosses}</p>
            <p>{props.maxDrawdown}</p>
            <p>{props.marketCondition}</p>
            <p>{props.mentalStrength}</p>
            <p>{props.physicalStrength}</p>
        </div>
    )
};

const mapStateToProps = state => {
    return {
        sessionId: state.id,
        sessionStartDateTime: state.startDateTime,
        marketCondition: state.session.marketCondition,
        mentalStrength: state.session.mentalStrength,
        physicalStrength: state.session.physicalStrength,
        profitTarget: state.session.profitTarget,
        maxLoss: state.session.maxLoss,
        stopLosses: state.session.stopLosses,
        maxDrawdown: state.session.maxDrawdown
    }
}

export default connect(mapStateToProps)(SessionInfo);