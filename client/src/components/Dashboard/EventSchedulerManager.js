import React from 'react';
import { withFirebase } from '../Firebase';
import {
  Button,
  Col,
  Form,
  FormGroup,
  Input,
  Label
} from 'reactstrap';


class EventSchedulerManager extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      eventsRawText: '',
      eventSlug: '',
      eventTitle: '',
      error: '',
      message: '',
      users: []
    };

    this.onRawEventsSubmit = this.onRawEventsSubmit.bind(this);
    this.onRawEventsChange = this.onRawEventsChange.bind(this);
    this.handleEventSlug = this.handleEventSlug.bind(this);
  }

  handleEventSlug(e) {
    this.setState({
      eventSlug: e.target.value
    });
  }

  handleEventTitle(e) {
    this.setState({
      eventTitle: e.target.value
    });
  }

  onCreateEvent(e) {
    console.log('I am clicked!');
    e.preventDefault();
    const { firebase } = this.props;
    const { eventSlug, eventTitle } = this.state;
    firebase.eventsBysSlug(eventSlug).once('value', snapshot => {
      console.log('checking the Firebase', snapshot.val());
      if (!snapshot.val()) {
        firebase.events().push({
          slug: eventSlug,
          title: eventTitle,
          date: new Date().toUTCString()
        }, err => {
          if (err) this.setState({error: err});
        })
      } else {
        this.setState({
          error: `There is already an event with the event slug, "${ eventSlug }." Try using a different one.`
        });
      }
    }).catch(err => this.setState({ error: err }));
  }

  onRawEventsChange(e) {
    this.setState({
      eventsRawText: e.target.value
    });
  }

  onRawEventsSubmit(e) {
    const { firebase } = this.props;
    const {
      username,
      firstName,
      lastName,
      uid
    } = this.props.user;

    e.preventDefault();
    let rawText = this.state.eventsRawText;
    if (!rawText) return this.setState({ error: 'Field must not be empty.' });
    let linesArray = rawText.split(/\r?\n/);
    let message = '';

    linesArray.forEach(line => {
      if (line.split('::').length < 3) return this.setState({ error: 'Each entry per line must consist of at least three fields.' });

      const splitComponents = line.split('::');

      let job = {
        slug: splitComponents[0],
        title: splitComponents[1],
        speakers: splitComponents[2],
        privacy: splitComponents[3] && splitComponents[3] === 'private' ? splitComponents[3] : 'public',
        username,
        userFullName: `${ firstName } ${ lastName }`,
        timeCreated: new Date().toUTCString(),
        viewCount: 0,
        completed: false,
        hasStarted: false
      };

      firebase.jobsBySlug(job.slug)
        .once('value', snapshot => {
          if (!snapshot.val()) {
            firebase.jobs()
              .push(job, err => {
                if (err) return this.setState({ error: err });
              });
            console.log(job.title + '\n')
            message += job.title + '\n';
          } else {
            this.setState({
              error: `There is already a job with the slug, "${ job.slug }." Try using a different one.`
            });
          }
        }).catch(err => this.setState({ error: err }));
      console.log(this.state.message);
        this.setState({message: message})
    });
  }

  render() {
    const { error, eventSlug, eventTitle, users } = this.state;
    return (
      <div>
        <h1>Event Manager { eventSlug } </h1>
        { !!error && <p>{ error }</p> }
        <div className="vertical-padding-5em" />
        <h2>Event Creator</h2>
        <Form>
          <FormGroup row>
            <Label for="slug" sm={ 2 }>Event Slug</Label>
            <Col sm={ 10 }>
              <Input
                value={ eventSlug }
                onChange={ e => this.handleEventSlug(e) }
                type="text"
                name="slug"
                id="slug"
                placeholder="(i.e. srcconpower" />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="title" sm={ 2 }>Event Title</Label>
            <Col sm={ 10 }>
              <Input
                value={ eventTitle }
                onChange={ e => this.handleEventTitle(e) }
                type="text"
                name="title"
                id="title"
                placeholder="(i.e. SRCCON:POWER" />
            </Col>
          </FormGroup>
          <Button onClick={e => this.onCreateEvent(e) } color="primary">Create Event</Button>
        </Form>
        <p>{ this.state.message }</p>s
        <hr />
        <h2>Event Job Scheduler</h2>
        <Form>
          <FormGroup>
        <textarea
          value={ this.state.eventsRawText }
          onChange={ e => this.onRawEventsChange(e) }
          className="form-control form-control-alternative event-scheduler--event-input"
          rows="10"
          cols="100"
          placeholder="Add events in the format: SLUG::EVENT NAME::SPEAKERS::[private/public]." />
          </FormGroup>
          <Button color="primary" onClick={ e => this.onRawEventsSubmit(e) }>Create scheduled events</Button>
        </Form>
        <hr />
        <Form>
          <FormGroup>
            <Label for="slug">Slug</Label>
            <Input type="text" name="slug" id="slug" placeholder="Add a slug." />
          </FormGroup>
          <FormGroup>
            <Label for="title">Title</Label>
            <Input type="text" name="title" id="title" placeholder="Add a title." />
          </FormGroup>
          <FormGroup>
            <Label for="speakers">Speakers</Label>
            <Input type="text" name="speakers" id="speakers" placeholder="Add speakers." />
          </FormGroup>
          <FormGroup>
            <Label for="exampleSelect">Event</Label>
            <Input type="select" name="event" id="event">
              <option>1</option>
            </Input>
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input type="checkbox" />{ ' ' }
              Private
            </Label>
          </FormGroup>
          <Button>Submit</Button>
        </Form>
      </div>
    );
  }
}

EventSchedulerManager.propTypes = {};

export default withFirebase(EventSchedulerManager);
