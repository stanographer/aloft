import React from 'react';
import { Link } from 'react-router-dom';
import {
  Collapse,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Nav,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavItem,
  NavLink,
  UncontrolledDropdown
} from 'reactstrap';

import { AuthUserContext } from '../Session';
import * as ROUTES from '../../constants/routes';
import SignOutButton from '../SignOut';

const Navigation = (props) => (
  <AuthUserContext.Consumer>
    { authUser => authUser
      ? <NavigationAuthUser { ...props } />
      : <NavigationNonAuth /> }
  </AuthUserContext.Consumer>
);

class NavigationAuthUser extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    const { firstName, lastName } = this.props.user;
    return (
      <div>
        <Navbar className="navbar-horizontal navbar-expand-lg" expand="md">
          <NavbarBrand href="/">
            Upwordly
          </NavbarBrand>
          <NavbarToggler onClick={ this.toggle } />
          <Collapse isOpen={ this.state.isOpen } navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="/dashboard/">Dashboard</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="https://github.com/reactstrap/reactstrap">GitHub</NavLink>
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  {firstName} {lastName}
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                    Option 1
                  </DropdownItem>
                  <DropdownItem>
                    Option 2
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>
                    Reset
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
              <NavItem>
                <SignOutButton />
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

// const NavigationAuthUser = () => (
//   <div>
//     <p>List Based</p>
//     <Nav>
//       <NavItem>
//         <Link to={ ROUTES.LANDING }>Landing</Link>
//       </NavItem>
//       <NavItem>
//         <Link to={ ROUTES.DASHBOARD }>Dashboard</Link>
//       </NavItem>
//       <NavItem>
//         <Link to={ ROUTES.ACCOUNT }>Account</Link>
//       </NavItem>
//       <NavItem>
//         <Link to={ ROUTES.ADMIN }>Admin</Link>
//       </NavItem>
//       <NavItem>
//         <SignOutButton />
//       </NavItem>
//     </Nav>
//     <hr />
//   </div>
// );

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
