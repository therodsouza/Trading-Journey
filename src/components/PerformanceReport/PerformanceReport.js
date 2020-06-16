import React from 'react';
import { connect } from 'react-redux';
import { formatter } from '../../util/utility';
import classes from './performanceReport.module.css';

const PerformanceReport = props => {
    return (
        <div className={classes.PerformanceReport}>
            <div className={classes.title}>
                <p>Performance Report</p>
            </div>
            <div>
                <div className={classes.leftPanel}>
                    <p>Profit: <span>{formatter.format(props.profit)}</span></p>
                    <p>Winners: <span>{props.winners}</span></p>
                    <p>Losers: <span>{props.losers}</span></p>
                    <p>Win rate: <span>{props.winrate ? props.winrate.toFixed(2) : 0}&#37;</span></p>
                </div>
                <div className={classes.rightPanel}>
                    <p>Costs: <span>{formatter.format(props.overallCosts)}</span></p>
                    <p>Row of winners: <span>{props.maxSequenceWinners}</span></p>
                    <p>Row of losers: <span>{props.maxSequenceLosers}</span></p>
                    <p>Drawdown: <span>{formatter.format(props.drawdown)}</span></p>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        profit: state.tradingSession.session.profit,
        winners: state.tradingSession.session.winners,
        losers: state.tradingSession.session.losers,
        winrate: state.tradingSession.session.winrate,
        overallCosts: state.tradingSession.session.overallCosts,
        maxSequenceWinners: state.tradingSession.session.maxSequenceWinners,
        maxSequenceLosers: state.tradingSession.session.maxSequenceLosers,
        drawdown: state.tradingSession.session.drawdown
    }
};

export default connect(mapStateToProps)(PerformanceReport);