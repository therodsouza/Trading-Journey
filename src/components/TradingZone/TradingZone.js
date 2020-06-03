import React, { useState } from 'react';
import { connect } from 'react-redux';

import Button from 'react-bootstrap/Button';
import Modal from '../UI/Modal/Modal';
import TradeWizard from '../TradeWizard/TradeWizard';

import * as actions from '../../store/actions/index';
import classes from './tz.module.css';

const TradingZone = props => {

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
        props.onTradeActivated({ ...trade, session: props.session });
        // add datetime, status
        setType(null);
    }

    return (
        <div className={classes.TZ}>
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
    );
};

const mapStateToProps = state => {
    return {
        session: state.tradingSession.session.sessionId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onTradeActivated: (trade) => dispatch(actions.activateTrade(trade))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TradingZone);