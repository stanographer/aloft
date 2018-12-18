import React from 'react';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
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
      privacyPassword: '',
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
          error: 'Slug names may only consist of lower case letters, numbers, dashes, and hyphens.'
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
      privacyPassword,
      viewCount,
      completed
    } = this.state;

    firebase.allJobs()
      .push({
        slug: !!slug && slug.trim().toLowerCase(),
        title: !!title && title.trim(),
        username,
        userFullName: `${ firstName } ${ lastName }`,
        speakers: !!speakers && speakers.trim(),
        timeCreated,
        privacy,
        privacyPassword,
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
    const { username } = this.props.user;
    const {
      error,
      slug,
      speakers,
      privacyPassword,
      title
    } = this.state;

    let formInvalid = (error !== '' || slug === '');

    return (
      <div>
        <Card>
          <CardHeader>
            <h4 className="title d-inline text-primary">CREATE NEW JOB</h4>
            <hr />
          </CardHeader>
          <CardBody>
            <Form autoComplete="off">
              <Row form>
                <Col md={ 12 }>
                  <FormGroup>
                    <Label for="slug">URI SLUG (required)</Label>
                    <Input autoComplete="off"
                           data-lpignore="true" // Disable LastPass's autofill thingy.
                           type="text"
                           bsSize="lg"
                           required
                           name="slug"
                           id="slug"
                           placeholder='e.g. srcconpower2018-power-people-of-color'
                           value={ this.state.slug }
                           onChange={ e => this.onChange(e) } />
                    { slug && !error
                      ? <p
                        className="text-success">{ `${ window.location.protocol }//${ window.location.host }/${ username }/${ slug }` }</p>
                      : '' }
                    { error && <p className="text-warning">{ error }</p> }
                  </FormGroup>
                  <FormGroup>
                    <Label for="title">TITLE</Label>
                    <Input
                      autoComplete="false"
                      data-lpignore="true" // Disable LastPass's autofill thingy.
                      type="text"
                      bsSize="lg"
                      required
                      name="title"
                      id="title"
                      placeholder='e.g. Power to the People—of Color'
                      value={ this.state.title }
                      onChange={ e => this.onChange(e) } />
                    { title && !error
                      ? <p className="text-success">{ `"${ title }"` }</p>
                      : '' }
                  </FormGroup>
                  <FormGroup>
                    <Label for="speakers">SPEAKER(S)</Label>
                    <Input
                      autoComplete="false"
                      data-lpignore="true" // Disable LastPass's autofill thingy.
                      type="text"
                      bsSize="lg"
                      required
                      name="speakers"
                      id="speakers"
                      placeholder='e.g. Emmanuel Martinez, Julia B. Chan'
                      value={ this.state.speakers }
                      onChange={ e => this.onChange(e) } />
                    { speakers && !error
                      ? <p className="text-success">{ `"${ speakers }"` }</p>
                      : '' }
                  </FormGroup>
                  <FormGroup check>
                    <Input defaultChecked={ this.state.privacy }
                           onChange={ this.onTogglePrivacy }
                           type="checkbox"
                           name="privacy"
                           id="privacy" />
                    <span className="form-check-sign">
                <span className="check" />
                </span>
                    <Label for="privacy" check>Private</Label>
                  </FormGroup>
                  <br />
                  <FormGroup hidden={!this.state.privacy}>
                    <Input
                      autoComplete="false"
                      data-lpignore="true" // Disable LastPass's autofill thingy.
                      type="password"
                      bsSize="lg"
                      required
                      name="privacyPassword"
                      id="privacyPassword"
                      value={ this.state.privacyPassword }
                      onChange={ e => this.onChange(e) } />
                    <br />
                    <p className="text-success">Users will have to type in this password to access the transcription.</p>
                  </FormGroup>
                </Col>
              </Row>
            </Form>
          </CardBody>
          <CardFooter>
            <Button
              type="submit"
              color="primary"
              disabled={ formInvalid }
              onClick={ e => this.onSubmit(e) }>
              CREATE EVENT
            </Button>
          </CardFooter>
        </Card>
        { !!this.state.message && <p>{ this.state.message }</p> }
      </div>
    );
  }
}

JobCreator.propTypes = {};

const condition = authUser => !!authUser;
export default compose(withRouter, withFirebase, withAuthorization(condition))(JobCreator);
