import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Layout from './hoc/Layout/Layout';
import Cockpit from './components/Cockpit/Cockpit';
import Journal from './components/Journal/Journal';
import Statistic from './components/Statistics/Statistics';

import classes from './app.module.css';

function App() {

  let routes = (
    <Switch>
      <Route path="/cockpit" component={Cockpit} />
      <Route path="/journal" component={Journal} />
      <Route path="/stats" component={Statistic} />
    </Switch>
  )

  return (
    <div className={classes.App}>
      <Layout>
        {routes}
      </Layout>
    </div>
  );
}

export default App;
