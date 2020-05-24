import React from 'react';
import classes from './modal.module.css';
import Aux from '../../../hoc/WrapperAux/WrapperAux';
import Backdrop from '../Backdrop/Backdrop.js';

const modal = (props) => (
    <Aux>
        <Backdrop show={props.show} clicked={props.modalClosed} />
        <div className={classes.Modal} style={{
            transform: props.show ? 'translateY(0)' : 'translateY(100vh)',
            opacity: props.show ? '1' : '0'
        }}>
            {props.children}
        </div>
    </Aux>


);

export default modal;