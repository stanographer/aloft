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

class JobCreator extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      slug: '',
      title: '',
      username: '',
      speakers: '',
      timeCreated: new Date().toUTCString(),
      privacy: false,
      conf: '',
      viewCount: 0,
      completed: false,
      error: '',
      warningVisible: true,
      message: ''
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

  // Start of Firebase functions.

  addJob = (slug) => {
    const { firebase } = this.props;

    firebase.jobsBySlug(slug).once('value', snapshot => {
      // Checks to see there are no existing jobs with that slug.
      if (snapshot.val()) return this.setState({ error: 'There is already a job with that slug.' });
      return this.addJobToJobs();
    });
  };

  addJobToJobs = () => {
    const { firebase } = this.props;
    const { username, firstName, lastName } = this.props.user;
    const {
      slug,
      title,
      speakers,
      timeCreated,
      privacy,
      viewCount,
      completed
    } = this.state;

    firebase.jobs()
      .push({
        slug: !!slug && slug.trim().toLowerCase(),
        title: !!title && title.trim(),
        username,
        userFullName: `${ firstName } ${ lastName }`,
        speakers: !!speakers && speakers.trim(),
        timeCreated,
        privacy,
        viewCount,
        completed
      }, err => {
        if (err) return this.setState({ error: err });
      }).then(job => {
      return this.addJobToUser(slug, job);
    });
  };

  addJobToUser = (slug, job) => {
    const { firebase } = this.props;
    const { uid } = this.props.user;

    firebase.user(uid)
      .child('jobs')
      .child(slug)
      .set({
        id: job.key
      }, err => {
        if (err) return this.setState({ error: err });
      })
      .then(() => {
        return this.setState({ message: 'Job successfully created!' });
      });
  };

  // End of Firebase functions.

  onSubmit = event => {
    event.preventDefault();
    const { slug } = this.state;
    this.addJob(slug);
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
        <h1>Job Creator</h1>
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
            onClick={ e => this.onSubmit(e) }>
            Create event
          </Button>
        </Form>
        { !!this.state.message && <p>{ this.state.message }</p> }
      </div>
    );
  }
}

JobCreator.propTypes = {};

const condition = authUser => !!authUser;
export default compose(withRouter, withFirebase, withAuthorization(condition))(JobCreator);
