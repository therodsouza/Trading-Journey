import React from 'react';
import styles from './backdrop.module.css';

const backdrop = (props) => (
    props.show ? <div className={styles.Backdrop} onClick={props.clicked}></div> : null
);

export default backdrop;