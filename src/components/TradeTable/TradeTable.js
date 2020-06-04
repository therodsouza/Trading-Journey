import React from 'react';

import Table from 'react-bootstrap/Table';

const TradeTable = props => {

    let content = null;

    if (props.trades) {
        content = props.trades.map(trade => (
            <tr>
                <td>{trade.ticker}</td>
                <td>{trade.pattern}</td>
                <td>{trade.timeframe}</td>
                <td>{trade.side}</td>
                <td>{trade.riskReward}</td>
                <td>{trade.priceIn}</td>
                <td>{trade.stopLoss}</td>
                <td>{trade.target}</td>
                <td>{trade.status}</td>
            </tr>
        ));
    }

    return (<div>
        <Table striped bordered hover size="sm">
            <thead>
                <tr>
                    <th>Ticker</th>
                    <th>Patern</th>
                    <th>Timeframe</th>
                    <th>Side</th>
                    <th>Ratio</th>
                    <th>Price In</th>
                    <th>Stop Loss</th>
                    <th>Target</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                {content}
            </tbody>
        </Table>
    </div>)

}

export default TradeTable;