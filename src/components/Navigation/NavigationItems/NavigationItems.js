import React from 'react';

import NavigationItem from './NavigationItem/NavigationItem';
import classes from './navigationItems.module.css';

const navigationItems = props => {

    let authNavItems = <NavigationItem link="/auth">Authenticate</NavigationItem>;

    if (props.isAuthenticated) {
        authNavItems =
            <React.Fragment>
                <NavigationItem link="/cockpit">Cockpit</NavigationItem>
                <NavigationItem link="/journal">Journal</NavigationItem>
                <NavigationItem link="/stats">Statistics</NavigationItem>
                <NavigationItem link="/logout">Logout</NavigationItem>
            </React.Fragment>
    }

    return (
        <ul className={classes.NavigationItems}>
            {authNavItems}
        </ul>
    );
};

export default navigationItems;
