import React from 'react';
import Button from 'react-bootstrap/Button';

import classes from './trades.module.css';

const Trades = props => {

    const buyHandler = () => {

    }

    const sellHandler = () => {

    }

    return (
        <div className={classes.Trades}>
            <h4>Trading zone</h4>

            <Button variant="dark" onClick={buyHandler}>BUY</Button>{' '}
            <Button variant="dark" onClick={sellHandler}>SELL</Button>



        </div>
    );
};

export default Trades;