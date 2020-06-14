import React from 'react';

import Toolbar from '../../components/Toolbar/Toolbar';
import Wrapper from '../../hoc/WrapperAux/WrapperAux';
import classes from './layout.module.css';
import { connect } from 'react-redux';

const layout = props => {

    return (
        <Wrapper>
            <Toolbar isAuth={props.isAuthenticated} />
            <main className={classes.Content}>
                {props.children}
            </main>
        </Wrapper>
    )
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}

export default connect(mapStateToProps)(layout);