import React from 'react';
import Table from 'react-bootstrap/Table';

import { formatter } from '../../util/utility';
import * as Icon from 'react-bootstrap-icons';
import classes from './tradeTable.module.css';


const TradeTable = props => {

    const compare = (trade, other) => {
        if (trade.startDateTime < other.startDateTime)
            return -1;
        
        if (trade.startDateTime > other.startDateTime)
            return 1;
        
        return 0;
    }

    let content = null;

    if (props.trades) {
        content = props.trades.sort(compare).map(trade => {

            let trClass = null;
            if (trade.status === 'Closed') {
                if ((trade.side === 'Long' && trade.priceOut > trade.priceIn)
                    || (trade.side === 'Short' && trade.priceOut < trade.priceIn)) {
                    trClass = classes.winner;
                } else {
                    trClass = classes.loser;
                }
            }

            return <tr key={trade.id} className={trClass}>
                <td>{new Date(trade.startDateTime).toLocaleTimeString()}</td>
                <td>{trade.ticker}</td>
                <td>{trade.pattern}</td>
                <td>{trade.timeframe}</td>
                <td>{trade.side}</td>
                <td>{trade.riskReward}</td>
                <td>{trade.volume}</td>
                <td>{formatter.format(trade.priceIn)}</td>
                <td>{formatter.format(trade.stopLoss)}</td>
                <td>{formatter.format(trade.target)}</td>
                <td>{trade.status}</td>
                <td>{trade.priceOut ? formatter.format(trade.priceOut) : '-'}</td>
                <td style={{ textAlign: 'center' }}>
                    {
                        trade.status === 'Open' ? <Icon.XOctagonFill
                            style={{ cursor: 'pointer' }}
                            color="red"
                            onClick={() => props.onClosePosition(trade.id)} /> : null
                    }
                </td>
            </tr>
        });
    }

    return (<div>
        <Table striped bordered hover size="sm" className={classes.TradeTable}>
            <thead>
                <tr>
                    <th>Time</th>
                    <th>Ticker</th>
                    <th>Patern</th>
                    <th>Timeframe</th>
                    <th>Side</th>
                    <th>Ratio</th>
                    <th>Volume</th>
                    <th>Price In</th>
                    <th>Stop Loss</th>
                    <th>Target</th>
                    <th>Status</th>
                    <th>Price Out</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {content}
            </tbody>
        </Table>
    </div>)

}

export default TradeTable;