import React from 'react';
import { withFirebase } from '../Firebase';
import {
  Table
} from 'reactstrap';

class JobList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      jobs: [],
      loading: true,
      message: ''
    };

  }

  componentDidMount() {
    const { firebase } = this.props;

    firebase.jobs().on('value', snapshot => {
      const jobs = snapshot.val();

      if (!jobs) {
        this.setState({
          message: 'You currently have no jobs.',
          loading: false
        });
        return;
      }

      const jobsList = Object.keys(jobs).map(key => ({
        ...jobs[key],
        uid: key
      }));
      console.log(jobsList);

      this.setState({
        jobs: jobsList,
        loading: false
      });
    });
  }

  componentWillUnmount() {
    this.props.firebase.jobs().off();
  }

  render() {
    const { jobs, loading } = this.state;
    return (
      <div>
        { !loading
        ? <Table borderless>
            <thead>
            <tr>
              <th />
              <th>URI slug</th>
              <th>Title</th>
              <th>Time</th>
              <th>View count</th>
              <th>Tools</th>
            </tr>
            </thead>
            <tbody>
            <ListOfJobs jobs={ jobs }
                        hidden={ !jobs || jobs.length === 0 }
                        firebase={this.props.firebase}/>
            </tbody>
          </Table>
          : <p className="text-center">Loading...</p>
        }
      </div>
    );
  }
}

const ListOfJobs = ({ jobs, firebase }) =>
  <>
    { !!jobs && jobs.map(job => (
      <tr key={ job.uid }>
        <th scope="row">1</th>
        <td>{ job.slug }</td>
        <td>{ job.title }</td>
        <td>{ job.timeCreated }</td>
        <td>{ job.viewCount }</td>
        <td>
          <a
            href={ `${ window.location.protocol }//${ window.location.host }/editor?user=${ job.username }&job=${ job.slug }` }>
            Edit
          </a>
          <br />
          <a href={ `${ window.location.protocol }//${ window.location.host }/${ job.username }/${ job.slug }` }
             target="_blank">Open in new window</a>
          <br />
          <a href="#" onClick={() => {
            firebase.deleteJobFromJobs(job.uid);
            firebase.deleteJobFromUser(job.slug);
          }}>Delete</a>
        </td>
      </tr>
    )) }
  </>;

JobList.propTypes = {};

export default withFirebase(JobList);
