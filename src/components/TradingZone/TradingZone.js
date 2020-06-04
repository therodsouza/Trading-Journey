import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import Button from 'react-bootstrap/Button';
import Modal from '../UI/Modal/Modal';
import TradeWizard from '../TradeWizard/TradeWizard';
import TradeTable from '../TradeTable/TradeTable';

import * as actions from '../../store/actions/index';
import classes from './tz.module.css';

const TradingZone = props => {

    const onFetchTrades = props.onFetchTrades;
    const session = props.session;

    useEffect(() => {
        onFetchTrades(session);
    }, [session, onFetchTrades])

    const [type, setType] = useState(null)

    const buyHandler = () => {
        setType('Buy');
    }

    const sellHandler = () => {
        setType('Sell');
    }

    const cancelTradeHandler = () => {
        setType(null);
    }

    const activateTradeHandler = (trade) => {
        props.onTradeActivated(
            {
                ...trade,
                session: props.session,
                startDateTime: Date.now(),
                status: 'Open'
            });
        setType(null);
    }

    return (
        <div className={classes.TZ}>
            <div className={classes.Top}>
                <div className={classes.Title}>
                    <h4>Trading zone</h4>
                </div>

                <div className={classes.Toolbar}>
                    <Button variant="success" onClick={buyHandler}>BUY</Button>{' '}
                    <Button variant="danger" onClick={sellHandler}>SELL</Button>
                </div>
                <Modal show={type} modalClosed={cancelTradeHandler} >
                    <TradeWizard type={type} onTradeActivated={activateTradeHandler} />
                </Modal>
            </div>
            <div className={classes.Table}>
                <TradeTable trades={props.trades} />
            </div>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        session: state.tradingSession.session.sessionId,
        trades: state.trade.trades
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onTradeActivated: (trade) => dispatch(actions.activateTrade(trade)),
        onFetchTrades: (session) => dispatch(actions.fetchTrades(session))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TradingZone);