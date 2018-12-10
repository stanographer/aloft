import React from 'react';
import{
  Button
} from 'reactstrap';

import { withFirebase } from '../Firebase';

const SignOutButton = ({ firebase }) => (
  <Button type="button"
          className="ml-sm-3 d-none d-md-block"
          onClick={ firebase.doSignOut }>
    Sign Out
  </Button>
);

export default withFirebase(SignOutButton);
