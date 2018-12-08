import React from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

import { withAuthentication } from '../Session';
import Navigation from '../Navigation';
import LandingPage from '../Landing';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import PasswordChangePage from '../PasswordChange';
import PasswordForgetPage from '../PasswordForget';
import AccountPage from '../Account';
import AdminPage from '../Admin';
import DashboardPage from '../Dashboard';
import TranscriptEditor from '../TranscriptEditor';
import TranscriptView from '../TranscriptView';

import * as ROUTES from '../../constants/routes';

const App = () =>
  <Router>
    <div>
      <Navigation />
      <hr />
      <Route path={ ROUTES.ACCOUNT } component={ AccountPage } />
      <Route path={ ROUTES.ADMIN } component={ AdminPage } />
      <Route path={ ROUTES.DASHBOARD } component={ DashboardPage } />
      <Route exact path={ ROUTES.LANDING } component={ LandingPage } />
      <Route path={ ROUTES.SIGN_UP } component={ SignUpPage } />
      <Route path={ ROUTES.SIGN_IN } component={ SignInPage } />
      <Route path={ ROUTES.PASSWORD_CHANGE } component={ PasswordChangePage } />
      <Route path={ ROUTES.PASSWORD_FORGET } component={ PasswordForgetPage } />
      <Route path="/editor" component={ TranscriptEditor } />
      <Route path="/:user/:event" component={ TranscriptView } />
    </div>
  </Router>;

export default withAuthentication(App);
