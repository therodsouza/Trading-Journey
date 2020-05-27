import React from 'react';
import Button from 'react-bootstrap/Button';

import classes from './tz.module.css';

const TradingZone = props => {

    const buyHandler = () => {

    }

    const sellHandler = () => {

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




        </div>
    );
};

export default TradingZone;