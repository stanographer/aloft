import React from 'react';
import { withAuthorization } from '../Session';
import { withFirebase } from '../Firebase';
import {
  Container
} from 'reactstrap';
import Navigation from '../Navigation';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';
import EventCreator from './EventCreator';
import './index.css';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {},
      uid: ''
    };
  }

  render() {
    return (
      <>
        <Navigation user={this.state.user} />
        <Container className="dashboard-main">
          <EventCreator user={ this.state.user } uid={ this.state.uid } />
        </Container>
      </>
    );
  }

  componentDidMount() {
    const { firebase } = this.props;

    firebase.user(firebase.auth.currentUser.uid).once('value', snapshot => {
      const userSnapshot = snapshot.val();
      console.log(snapshot.val());
      this.setState({
        user: userSnapshot,
        uid: firebase.auth.currentUser.uid
      });
    });
  }
}

const condition = authUser => !!authUser;

export default compose(withRouter, withFirebase, withAuthorization(condition))(Dashboard);
