import React from 'react';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import withAuthorization from '../Session/withAuthorization';
import Navigation from '../Navigation';
import queryString from 'query-string';
import connection from '../ShareDB/connection';
import StringBinding from 'sharedb-string-binding';
import {
  Container,
  Form
} from 'reactstrap';
import './index.css';
import ShareDBBinding from 'sharedb-react-textbinding';

class ConnectedTranscriptEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      uid: ''
    };

    this.query = queryString.parse(this.props.location.search);
  }

  componentWillMount() {
    this.doc = connection.get(this.query.user, this.query.event);

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

  componentWillUnmount() {
    this.doc.removeListener();
    this.doc.destroy();
    this.binding.destroy();
    this.binding = null;
  }

  render() {
    const style = {
      color: '#172b4d',
      fontSize: '1.5em',
      height: '20em'
    };

    return (
      <div>
        <Navigation user={ this.state.user } />
        <Container>
          <div className="vertical-padding-3em" />
          <h1 className="display-2">Editor</h1>
          <p
            className="lead">{ `${ window.location.protocol }//${ window.location.host }/${ this.query.user }/${ this.query.event }` }</p>
          <div className="vertical-padding-3em" />
          <Form>
            <ShareDBBinding
              cssClass="form-control form-control-alternative"
              style={ style }
              doc={ this.doc }
              // onLoaded={ this.onLoaded }
              flag='≈'
              rows={10}
              cols={2}
              elementType="textarea" />
          </Form>
        </Container>
      </div>
    );
  }
}

const condition = authUser => !!authUser;
export default compose(withRouter, withFirebase, withAuthorization(condition))(ConnectedTranscriptEditor);
