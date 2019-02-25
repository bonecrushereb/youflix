import React from 'react';
import { Router, Switch, Route, Link, NavLink } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import LoginPage from '../components/LoginPage';
import SignupPage from '../components/SignupPage';
import YouFlixDashboardPage from '../components/YouFlixDashboardPage';
import NotFoundPage from '../components/NotFoundPage';

export const history = createHistory();

const AppRouter = () => (
  <Router history={history}>
    <div>
      <Switch>
        <Route exact path="/" component={LoginPage} />
        <Route path="/videos" component={YouFlixDashboardPage} />
        <Route path="*" component={NotFoundPage} />
      </Switch>
    </div>
  </Router>
);

export default AppRouter;
