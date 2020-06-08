import React from 'react';
import { connect } from 'react-redux';

import Wrapper from '../../hoc/WrapperAux/WrapperAux';
import { formatter } from '../../util/utility';

const PerformanceReport = props => {

    let overallScore = 0;
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

        return trade;
    });

    const profit = overallScore * 0.2; // FIXME based on asset class
    const winrate = (winners / (losers + winners)) * 100;

    return (
        <Wrapper>
            <div>
                <p>Performance Report</p>
            </div>
            <p>Profit: <span>{formatter.format(profit)}</span></p>
            <p>Winners: <span>{winners}</span></p>
            <p>Losers: <span>{losers}</span></p>
            <p>Win rate: <span>{winrate.toFixed(2)}&#37;</span></p>
        </Wrapper>
    )
}

const mapStateToProps = state => {
    return {
        trades: state.trade.trades
    }
}

export default connect(mapStateToProps)(PerformanceReport);