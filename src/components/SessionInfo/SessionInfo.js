import React from 'react';
import { connect } from 'react-redux';
import Wrapper from '../../hoc/WrapperAux/WrapperAux';

import classes from './sessionInfo.module.css';
import { formatter } from '../../util/utility';

import PerformanceReport from '../PerformanceReport/PerformanceReport';

const SessionInfo = props => {

    return (
        <Wrapper>
            <div className={classes.SessionInfo}>
                <div className={classes.card}>
                    <div className={classes.title}>
                        <p>Session {props.sessionId}</p>
                    </div>
                    <p>Session started: <span>{new Date(props.sessionStartDateTime).toLocaleString()}</span></p>
                    <p>Market context: <span>{props.marketContext}</span></p>
                    <p>Mental strength: <span>{props.mentalStrength}</span></p>
                    <p>Physical strength: <span>{props.physicalStrength}</span></p>
                </div>
                <div className={classes.card}>
                    <div className={classes.title}>
                        <p>Risk Management</p>
                    </div>
                    <p>Profit target: <span>{formatter.format(props.profitTarget)}</span></p>
                    <p>Max loss: <span>{formatter.format(props.maxLoss)}</span></p>
                    <p>Consecutive stop losses: <span>{props.stopLosses}</span></p>
                    <p>Max drawdown: <span>{formatter.format(props.maxDrawdown)}</span></p>
                </div>
                <div className={classes.card}>
                    <PerformanceReport />
                </div>
            </div>
        </Wrapper>
    )
};

const mapStateToProps = state => {
    return {
        sessionId: state.tradingSession.session.sessionId,
        sessionStartDateTime: state.tradingSession.session.startDateTime,
        marketContext: state.tradingSession.session.marketContext,
        mentalStrength: state.tradingSession.session.mentalStrength,
        physicalStrength: state.tradingSession.session.physicalStrength,
        profitTarget: state.tradingSession.session.profitTarget,
        maxLoss: state.tradingSession.session.maxLoss,
        stopLosses: state.tradingSession.session.stopLosses,
        maxDrawdown: state.tradingSession.session.maxDrawdown
    }
}

export default connect(mapStateToProps)(SessionInfo);