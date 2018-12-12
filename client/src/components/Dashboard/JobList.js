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
    this.props.firebase.jobsList().on('value', snapshot => {
      const jobsObj = snapshot.val();

      if (!jobsObj) {
        this.setState({
          message: 'You currently have no jobs.',
          loading: false
        });
        return;
      }

      const jobsList = Object.keys(jobsObj).map(key => ({
        ...jobsObj[key],
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
    this.props.firebase.jobsList().off();
  }

  render() {
    const { jobs } = this.state;
    return (
      <div>
        <Table borderless>
          <thead>
          <tr>
            <th />
            <th>URI slug</th>
            <th>Title</th>
            <th>Date</th>
            <th>View count</th>
            <th>Tools</th>
          </tr>
          </thead>
          <tbody>
          <ListOfJobs jobs={ jobs } />
          </tbody>
        </Table>
      </div>
    );
  }
}

const ListOfJobs = ({ jobs }) =>
  <>
    { jobs.map(job => (
      <tr key={ job.uid }>
        <th scope="row">1</th>
        <td>{job.slug}</td>
        <td>{job.title}</td>
        <td>{job.timeStarted}</td>
        <td>{job.viewCount}</td>
        <td>
          <a href={`${ window.location.protocol }//${ window.location.host }/editor?user=${ job.user }&job=${ job.slug }`}>
            Edit
          </a>
          <a href={`${ window.location.protocol }//${ window.location.host }/${ job.username }/${ job.slug }`}
             target="_blank">Open in new window</a>
        </td>
      </tr>
    )) }
  </>;

JobList.propTypes = {};

export default withFirebase(JobList);
