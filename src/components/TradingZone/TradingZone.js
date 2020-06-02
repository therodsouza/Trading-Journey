import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from '../UI/Modal/Modal';
import TradeWizard from '../TradeWizard/TradeWizard';

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

    return (
        <div className={classes.TZ}>
            <div className={classes.Title}>
                <h4>Trading zone</h4>
            </div>

            <div className={classes.Toolbar}>
                <Button variant="dark" onClick={buyHandler}>BUY</Button>{' '}
                <Button variant="dark" onClick={sellHandler}>SELL</Button>
            </div>

            <Modal show={type} modalClosed={cancelTradeHandler} >
                <TradeWizard type={type} />
            </Modal>
        </div>
    );
};

export default TradingZone;