import React from 'react';
import Moment from 'react-moment';

import classes from './journalEntry.module.css';
import { formatter } from '../../../../util/utility';

import Button from '../../../UI/Button/Button';

const JournalEntry = props => {

    return (<div className={classes.JournalEntry}>
        <h4>{props.entry.id} </h4>
        <p>Duration: <span>
            <Moment duration={props.entry.startDateTime} date={props.entry.endDateTime} />
        </span> | Mental strengh: {props.entry.mentalStrength} | Physical strength: {props.entry.physicalStrength}
        </p>
        <div className={classes.container}>
            <div className={classes.leftPanel}>
                <p>Profit: <span>{formatter.format(props.entry.profit)}</span></p>
                <p>Winners: <span>{props.entry.winners}</span></p>
                <p>Losers: <span>{props.entry.losers}</span></p>
                <p>Win rate: <span>{props.entry.winrate ? props.entry.winrate.toFixed(2) : 0}&#37;</span></p>
            </div>
            <div className={classes.rightPanel}>
                <p>Costs: <span>{formatter.format(props.entry.overallCosts)}</span></p>
                <p>Volume: <span>{props.entry.volume}</span></p>
                <p>Longest sequence: <span>{props.entry.maxSequenceWinners} winners | {props.entry.maxSequenceLosers} losers</span></p>
                <p>Drawdown: <span>{formatter.format(props.entry.drawdown)}</span></p>
            </div>
        </div>
        <div className={classes.comments}>
            <p>Comments: {props.entry.comments}</p>
        </div>
        <div className={classes.trades}>
            <Button btnType="Success" onClick={() => props.onShowTrades(props.entry.id)}>Show trades</Button>
        </div>
    </div>)
}

export default JournalEntry;