import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import Button from 'react-bootstrap/Button';
import Modal from '../UI/Modal/Modal';
import TradeWizard from '../TradeWizard/TradeWizard';
import TradeTable from '../TradeTable/TradeTable';
import ClosePosition from '../ClosePosition/ClosePosition';

import * as actions from '../../store/actions/index';
import classes from './tz.module.css';

const TradingZone = props => {

    const session = props.session;
    const token = props.token;
    const onFetchTrades = props.onFetchTrades;

    useEffect(() => {
        onFetchTrades(session, token);
    }, [session, token, onFetchTrades])

    const [type, setType] = useState(null)

    const [closePosition, setClosePosition] = useState(null);

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
            }, token);
        setType(null);
    }

    const closePositionHandler = closeParameters => {
        setClosePosition(null);
        props.onClosePosition(closeParameters, token);
    }

    const cancelClosePositionHandler = () => {
        setClosePosition(null);
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
                <TradeTable trades={props.trades} onClosePosition={setClosePosition}/>
                <Modal show={closePosition} modalClosed={cancelClosePositionHandler} >
                    <ClosePosition id={closePosition} onComplete={closePositionHandler}/>
                </Modal>
            </div>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        session: state.tradingSession.session.sessionId,
        trades: state.trade.trades,
        token: state.auth.token
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onTradeActivated: (trade, token) => dispatch(actions.activateTrade(trade, token)),
        onFetchTrades: (session, token) => dispatch(actions.fetchTrades(session, token)),
        onClosePosition: (closeParameters, token) => dispatch(actions.closePosition(closeParameters, token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TradingZone);