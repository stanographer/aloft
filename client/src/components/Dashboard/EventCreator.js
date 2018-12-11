import React from 'react';
import {
  Alert,
  Button,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Row
} from 'reactstrap';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import withAuthorization from '../Session/withAuthorization';

class EventCreator extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      slug: '',
      title: '',
      username: '',
      speakers: '',
      timeStarted: new Date().toUTCString(),
      privacy: false,
      conf: '',
      viewCount: 0,
      completed: false,
      error: '',
      warningVisible: true
    };

    this.onWarningDismiss = this.onWarningDismiss.bind(this);
  }

  onWarningDismiss() {
    this.setState({ warningVisible: false });
  }

  onChange = event => {
    const slugCheck = new RegExp('^[a-z0-9_-]*$');
    console.log(this.state);

    if (event.target.id === 'slug') {
      if (!slugCheck.test(event.target.value)) {
        this.setState({
          error: 'Slug names may only be lowercase, contain numbers, dashes, and hyphens.'
        });
      } else {
        this.setState({ error: '' });
      }
      event.target.value = event.target.value.toLowerCase();
    }
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  onTogglePrivacy = () => {
    this.setState({
      privacy: !this.state.privacy
    });
  };

  onSubmit = event => {
    event.preventDefault();

    const {
      username,
      firstName,
      lastName
    } = this.props.user;

    const {
      slug,
      title,
      speakers,
      timeStarted,
      privacy,
      conf,
      viewCount,
      completed,
      error
    } = this.state;

    const { firebase, uid } = this.props;

    firebase.user(uid)
      .child('events')
      .orderByChild('slug')
      .equalTo(slug)
      .once('value', snapshot => {
        if (!snapshot.val()) {
          firebase.user(uid)
            .child('events')
            .push({
              slug
            }, err => this.setState({error : err}))
            .then(eventObj => {
              firebase.eventByUid(eventObj.key)
                .set({
                  slug: !!slug && slug.trim().toLowerCase(),
                  title: !!title && title.trim(),
                  username,
                  userFullName: `${ firstName } ${ lastName }`,
                  speakers: !!speakers && speakers.trim(),
                  timeStarted,
                  privacy,
                  conf,
                  viewCount,
                  completed
                }, err => {
                  if (err) this.setState({ error });
                })
            });
        } else {
          this.setState({
            error: `There is already an event with the slug, "${slug}." Try using a different one.`
          });
        }
      }).catch(err => this.setState({error: err}));
  };

  componentWillUnmount() {
    this.props.firebase.user().off();
  }

  render() {
    const {
      slug,
      error
    } = this.state;

    let formInvalid = (error !== '' || slug === '');

    return (
      <div>
        <h1>Event creator</h1>
        <Form>
          <Row form>
            <Col md={ 6 }>
              <FormGroup>
                <Label for="slug">URI slug</Label>
                <Input type="text"
                       required
                       name="slug"
                       id="slug"
                       placeholder="Type in a slug."
                       value={ this.state.slug }
                       onChange={ e => this.onChange(e) } />
              </FormGroup>
              <FormGroup>
                <Label for="title">Title</Label>
                <Input
                  type="text"
                  required
                  name="title"
                  id="title"
                  placeholder="Type in a title."
                  value={ this.state.title }
                  onChange={ e => this.onChange(e) } />
              </FormGroup>
              <FormGroup>
                <Label for="speakers">Speaker(s)</Label>
                <Input
                  type="text"
                  required
                  name="speakers"
                  id="speakers"
                  placeholder="Type in a speakers' names followed by a comma."
                  value={ this.state.speakers }
                  onChange={ e => this.onChange(e) } />
              </FormGroup>
            </Col>
          </Row>
          <FormGroup check>
            <Input type="checkbox"
                   name="privacy"
                   id="privacy"
                   defaultChecked={ this.state.privacy }
                   onChange={ this.onTogglePrivacy } />
            <Label for="exampleCheck" check>Private</Label>
          </FormGroup>
          { this.state.error &&
          <Alert color="warning" isOpen={ this.state.warningVisible } toggle={ this.onWarningDismiss }>
            { this.state.error }
          </Alert> }
          <Button
            type="submit"
            color="primary"
            disabled={ formInvalid }
            onClick={ this.onSubmit }>
            Create event
          </Button>
        </Form>
      </div>
    );
  }
}

EventCreator.propTypes = {};

const condition = authUser => !!authUser;
export default compose(withRouter, withFirebase, withAuthorization(condition))(EventCreator);
