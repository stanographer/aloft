import React from 'react';
import { Link } from 'react-router-dom';

import { AuthUserContext } from '../Session';
import * as ROUTES from '../../constants/routes';
import SignOutButton from '../SignOut';

const Navigation = () => (
  <AuthUserContext.Consumer>
    { authUser => authUser
      ? <NavigationAuthUser />
      : <NavigationNonAuth /> }
  </AuthUserContext.Consumer>
);

const NavigationAuthUser = () => (
  <div>
    <div>
      <ul>
        <li>
          <Link to={ ROUTES.LANDING }>Landing</Link>
        </li>
        <li>
          <Link to={ ROUTES.DASHBOARD }>Dashboard</Link>
        </li>
        <li>
          <Link to={ ROUTES.ACCOUNT }>Account</Link>
        </li>
        <li>
          <Link to={ ROUTES.ADMIN }>Admin</Link>
        </li>
        <li>
          <SignOutButton />
        </li>
      </ul>
    </div>
  </div>
);

const NavigationNonAuth = () => (
  <div>
    <ul>
      <li>
        <Link to={ ROUTES.SIGN_IN }>Sign In</Link>
      </li>
      <li>
        <Link to={ ROUTES.LANDING }>Landing</Link>
      </li>
    </ul>
  </div>
);

export default Navigation;
