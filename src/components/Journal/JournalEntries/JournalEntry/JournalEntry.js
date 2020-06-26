import React from 'react';

import { formatter } from '../../../../util/utility';

const JournalEntry = props => {

    return (<div>
        <h4>Journal Entry {props.entry.id} </h4>
        <div>
            <div>
                <p>Profit: <span>{formatter.format(props.entry.profit)}</span></p>
                <p>Winners: <span>{props.entry.winners}</span></p>
                <p>Losers: <span>{props.entry.losers}</span></p>
                <p>Win rate: <span>{props.entry.winrate ? props.entry.winrate.toFixed(2) : 0}&#37;</span></p>
            </div>
            <div>
                <p>Costs: <span>{formatter.format(props.entry.overallCosts)}</span></p>
                <p>Row of winners: <span>{props.entry.maxSequenceWinners}</span></p>
                <p>Row of losers: <span>{props.entry.maxSequenceLosers}</span></p>
                <p>Drawdown: <span>{formatter.format(props.entry.drawdown)}</span></p>
            </div>
        </div>
    </div>)

}

export default JournalEntry;