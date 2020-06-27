import React from 'react';
import Moment from 'react-moment';
import Table from 'react-bootstrap/Table';

import classes from './tradeList.module.css';
import { formatter } from '../../../util/utility';
import { calculateProfit, calculateOutcome } from '../../../service/trade/trade';

const TradeList = props => {

    const calcDuration = trade => {
        return <Moment duration={trade.startDateTime} date={trade.closeDateTime} />
    }

    const rows = props.trades.map(trade => {

        const pl = calculateProfit(trade)
        const outcome = calculateOutcome(trade);
        const duration = calcDuration(trade);

        let trClass = pl > 0 ? classes.winner : classes.loser;

        return (
            <tr key={trade.id} className={trClass}>
                <td>{new Date(trade.startDateTime).toLocaleTimeString([], { timeStyle: 'short' })}</td>
                <td>{duration}</td>
                <td>{trade.ticker}</td>
                <td>{trade.pattern}</td>
                <td>{trade.timeframe}</td>
                <td>{trade.side}</td>
                <td>{trade.riskReward}</td>
                <td>{trade.volume}</td>
                <td>{outcome}</td>
                <td>{formatter.format(pl)}</td>
                <td>{trade.tags}</td>
            </tr>)
    })

    return (
        <div className={classes.TradeList}>
            <h4>{props.title}</h4>
            <Table striped bordered hover size="sm" className={classes.TradeList}>
                <thead>
                    <tr>
                        <th>Start</th>
                        <th>Duration</th>
                        <th>Ticker</th>
                        <th>Patern</th>
                        <th>Timeframe</th>
                        <th>Side</th>
                        <th>Ratio</th>
                        <th>Volume</th>
                        <th>FG/FS</th>
                        <th>PL</th>
                        <th>Tags</th>
                    </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </Table>
        </div>
    );
}

export default TradeList;