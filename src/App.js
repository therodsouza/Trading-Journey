import React, { useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Auth from './components/Auth/Auth';
import Layout from './hoc/Layout/Layout';
import Cockpit from './components/Cockpit/Cockpit';
import Journal from './components/Journal/Journal';
import Statistic from './components/Statistics/Statistics';
import Logout from './components/Auth/Logout/Logout';

import * as actions from './store/actions/index';

import classes from './app.module.css';

function App(props) {

  const { onTryAutoSignup } = props;
  
  useEffect(() => {
    onTryAutoSignup();
  }, [onTryAutoSignup])

  let routes = (
    <Switch>
      <Route path="/auth" render={(props) => <Auth {...props} />} />
    </Switch>
  )

  if (props.isAuthenticated) {
    routes = (
      <Switch>
        <Route path="/cockpit" component={Cockpit} />
        <Route path="/journal" component={Journal} />
        <Route path="/stats" component={Statistic} />
        <Route path="/logout" component={Logout} />
        <Redirect to="/cockpit" />
      </Switch>
    )
  }

  return (
    <div className={classes.App}>
      <Layout>
        {routes}
      </Layout>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
