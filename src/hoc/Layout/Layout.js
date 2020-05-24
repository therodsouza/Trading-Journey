import React from 'react';

import Toolbar from '../../components/Toolbar/Toolbar';
import Wrapper from '../../hoc/WrapperAux/WrapperAux';
import classes from './layout.module.css';

const layout = props => {

    return (
        <Wrapper>
            <Toolbar />
            <main className={classes.Content}>
                {props.children}
            </main>
        </Wrapper>
    )
}

export default layout;