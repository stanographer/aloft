import React from 'react';
import { withFirebase } from '../Firebase';
import Viewer from './Viewer';
import Private from '../Placeholders/Private';
import HasntStarted from '../Placeholders/HasntStarted';

class Index extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      job: {},
      jobId: '',
      loading: true,
      user: ''
    };

    this.docParams = this.props.match.params;
  }

  componentWillMount() {
    const { firebase } = this.props;

    firebase.findUser(this.docParams.user).on('value', snapshot => {
      if (!snapshot.val()) return this.setState({loading: false});

      const returnedUser = snapshot.val();
      const user = Object.keys(returnedUser).map(key => ({
        ...returnedUser[key]
      }));

      if (!user[0].jobs[this.docParams.job]) return this.setState({loading: false});

      this.setState({
        user: user[0].username,
        jobId: user[0].jobs[this.docParams.job].id
      });

      return this.findJob();
    });
  }

  componentWillUnmount() {
    const { firebase } = this.props;

    firebase.findUser().off();
    firebase.jobById().off();
  }

  findJob() {
    const { firebase } = this.props;
    const { jobId } = this.state;

    firebase.jobById(jobId).once('value', snapshot => {
      if (!snapshot.val()) return;
      const returnedJob = snapshot.val();

      this.setState({
        job: returnedJob,
        loading: false
      });
    });
  };

  render() {
    const { job, jobId, loading } = this.state;

    return (
      <>
        { !loading
          ?
          job && jobId && job.privacy === true
            ? <p>this is a private event.</p>
            : job && jobId
            ? <Viewer user={ this.docParams.user } job={ this.docParams.job } />
            : <p>No event found with that user/job combination!</p>
        : null
        }
      </>
    );
  }
}

export default withFirebase(Index);
