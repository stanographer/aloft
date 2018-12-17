import React from 'react';
import { withAuthorization } from '../Session';
import { withFirebase } from '../Firebase';
import {
  Col,
  Container,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane
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
        <div className="vertical-padding-5em"/>
        <Nav tabs>
          <NavItem>
            <NavLink
              className={ classnames({ active: this.state.activeTab === '1' }) }
              onClick={ () => {
                this.toggleTab('1');
              } }>
              Jobs
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={ classnames({ active: this.state.activeTab === '2' }) }
              onClick={ () => {
                this.toggleTab('2');
              } }>
              Event Manager
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={ this.state.activeTab }>
          <TabPane tabId="1">
            <Row>
              <Col sm="12">
                <Container className="dashboard-main">
                  <JobCreator user={ this.state.user } />
                  <JobList />
                </Container>
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="2">
            <Container>
            <Row>
              <Col sm="12">
                <EventSchedulerManager user={ this.state.user } />
              </Col>
            </Row>
            </Container>
          </TabPane>
        </TabContent>
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
        },
      });
    });
  }
}

const condition = authUser => !!authUser;

export default compose(withRouter, withFirebase, withAuthorization(condition))(Dashboard);
