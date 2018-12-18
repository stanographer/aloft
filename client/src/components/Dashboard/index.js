import React from 'react';
import { withAuthorization } from '../Session';
import { withFirebase } from '../Firebase';
import {
  Col,
  Container,
  Row
} from 'reactstrap';
import Navigation from '../Navigation';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';
import JobCreator from './JobCreator';
import './index.css';
import JobList from './JobList';
import classnames from 'classnames';
import EventSchedulerManager from './EventSchedulerManager';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeTab: '1',
      user: {},
      uid: ''
    };

    this.toggleTab = this.toggleTab.bind(this);
  }

  toggleTab(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  render() {
    return (
      <div>
        <Navigation user={ this.state.user } />
        <Container className="wrapper">
          <div className="vertical-padding-5em" />
          <Row>
            <Col lg="6" md="12">
              <JobCreator user={ this.state.user } />
            </Col>
            <Col lg="6" md="12">
              <JobList />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }

  componentDidMount() {
    const { firebase } = this.props;

    firebase.user(firebase.auth.currentUser.uid).once('value', snapshot => {
      const userSnapshot = snapshot.val();
      console.log(snapshot.val());
      this.setState({
        user: {
          ...userSnapshot,
          uid: firebase.auth.currentUser.uid
        }
      });
    });
  }
}

const condition = authUser => !!authUser;

export default compose(withRouter, withFirebase, withAuthorization(condition))(Dashboard);
