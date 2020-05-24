import React from 'react';

import NavigationItem from './NavigationItem/NavigationItem';
import classes from './navigationItems.module.css';

const navigationItems = props => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/cockpit">Cockpit</NavigationItem>
        <NavigationItem link="/journal">Journal</NavigationItem>
        <NavigationItem link="/stats">Statistics</NavigationItem>
    </ul>
);

export default navigationItems;
