import React from 'react';
import { withFirebase } from '../Firebase';

class AdminPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      message: '',
      users: []
    };
  }

  componentDidMount() {
    this.setState({
      loading: true
    });

    this.props.firebase.users().on('value', snapshot => {
      const usersObject = snapshot.val();
      if (!usersObject) {
         this.setState({
           loading: false,
           message: 'There are currently no users in the database to load.'
         });
         return;
      }

      const usersList = Object.keys(usersObject).map(key => ({
        ...usersObject[key],
        uid: key
      }));

      this.setState({
        users: usersList,
        loading: false
      });
    });
  }

  componentWillUnmount() {
    this.props.firebase.users().off();
  }

  render() {
    const { message, users, loading } = this.state;

    return (
      <div>
        <h1>Admin</h1>
        { loading && <div>Loading ...</div> }
        { message && <div>There are no users to load.</div> }
        <UserList users={ users } />
      </div>
    );
  }
}

const UserList = ({ users }) => (
  <ul>
    { users.map(user => (
      <li key={ user.uid }>
        <span>
          <strong>ID:</strong> { user.uid }
        </span>
        <span>
          <strong>E-Mail:</strong> { user.email }
        </span>
        <span>
          <strong>Username:</strong> { user.username }
        </span>
      </li>
    )) }
  </ul>
);

// const condition = authUser => !!authUser;
export default withFirebase(AdminPage);

// const condition = authUser =>
//   authUser && authUser.roles && authUser.roles.includes(ROLES.ADMIN);

// export default withAuthorization(condition)(AdminPage);
