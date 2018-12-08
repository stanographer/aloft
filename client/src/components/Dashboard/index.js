import React from 'react';
import { withAuthorization } from '../Session';
import {
  Container
}

const Dashboard = () => (
  <div>
    <h1>Home Page</h1>
    <p>The Home Page is accessible by every signed in user.</p>
  </div>
);

const condition = authUser => !!authUser;
export default withAuthorization(condition)(Dashboard);
