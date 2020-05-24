import React from 'react';

import styles from './button.module.css';


const button = (props) => (
    <button className={[styles.Button, styles[props.btnType]].join(' ')} onClick={props.onClick} disabled={props.disabled}>
        {props.children}
    </button>
);

export default button;