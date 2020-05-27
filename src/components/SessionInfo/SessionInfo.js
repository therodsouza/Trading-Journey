import React from 'react';
import { connect } from 'react-redux';
import Wrapper from '../../hoc/WrapperAux/WrapperAux';

import classes from './sessionInfo.module.css';
import { formatter } from '../../util/utility';

const SessionInfo = props => {

    return (
        <Wrapper>
            <div className={classes.SessionInfo}>
                <div className={classes.card}>
                    <div className={classes.title}>
                        <p>Session Information</p>
                    </div>
                    <p>Session started: <span>{new Date(props.sessionStartDateTime).toLocaleString()}</span></p>
                    <p>Market condition: <span>{props.marketCondition}</span></p>
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
                    <div className={classes.title}>
                        <p>Performance Report</p>
                    </div>
                    <p>Profit: <span>R$25.000,00</span></p>
                    <p>Winners: <span>8</span></p>
                    <p>Losers: <span>3</span></p>
                    <p>Win rate: <span>68%</span></p>
                </div>
            </div>
        </Wrapper>
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