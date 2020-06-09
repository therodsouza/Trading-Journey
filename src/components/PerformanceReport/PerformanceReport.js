import React from 'react';
import { connect } from 'react-redux';

import { formatter } from '../../util/utility';
import classes from './performanceReport.module.css';

const PerformanceReport = props => {

    let overallScore = 0;
    let overallCosts = 0;
    let winners = 0;
    let losers = 0;

    props.trades.filter(trade => {
        return trade.status === 'Closed'
    }).map(trade => {

        let score = 0;

        if (trade.side === 'Long') {
            score = + (trade.priceOut - trade.priceIn) * trade.volume;
        } else {
            score = - (trade.priceOut - trade.priceIn) * trade.volume;
        }

        if (score <= 0) {
            losers++;
        } else {
            winners++;
        }

        overallScore += score;
        overallCosts += trade.volume * 0.5 // FIXME based on asset class

        return trade;
    });

    const profit = (overallScore * 0.2) - overallCosts; // FIXME based on asset class
    const winrate = (winners / (losers + winners)) * 100;

    return (
        <div className={classes.PerformanceReport}>
            <div className={classes.title}>
                <p>Performance Report</p>
            </div>
            <div>
                <div className={classes.leftPanel}>
                    <p>Profit: <span>{formatter.format(profit)}</span></p>
                    <p>Winners: <span>{winners}</span></p>
                    <p>Losers: <span>{losers}</span></p>
                    <p>Win rate: <span>{winrate.toFixed(2)}&#37;</span></p>
                </div>
                <div className={classes.rightPanel}>
                    <p>Costs: <span>{formatter.format(overallCosts)}</span></p>
                    <p>Row of winners:</p>
                    <p>Row of losers:</p>
                    <p>Drawdown:</p>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        trades: state.trade.trades
    }
}

export default connect(mapStateToProps)(PerformanceReport);