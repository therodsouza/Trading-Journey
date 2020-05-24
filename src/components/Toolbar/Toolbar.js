import React from 'react';

import NavigationItems from '../Navigation/NavigationItems/NavigationItems';
import classes from './toolbar.module.css';

const toolbar = props => {
    return (
        <header className={classes.Toolbar}>
            <p>Trading Journey</p>
            <nav>
                <NavigationItems />
            </nav>

        </header>
    )
}

export default toolbar;