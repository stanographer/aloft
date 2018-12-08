import React from 'react';
import { Link } from 'react-router-dom';
import {
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';

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
    <p>List Based</p>
    <Nav>
      <NavItem>
        <Link to={ ROUTES.LANDING }>Landing</Link>
      </NavItem>
      <NavItem>
        <Link to={ ROUTES.DASHBOARD }>Dashboard</Link>
      </NavItem>
      <NavItem>
        <Link to={ ROUTES.ACCOUNT }>Account</Link>
      </NavItem>
      <NavItem>
        <Link to={ ROUTES.ADMIN }>Admin</Link>
      </NavItem>
      <NavItem>
        <SignOutButton />
      </NavItem>
    </Nav>
    <hr />
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
