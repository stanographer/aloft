import React from 'react';
import { withFirebase } from '../Firebase';
import Viewer from './Viewer';
import Private from '../Placeholders/Private';
import HasntStarted from '../Placeholders/HasntStarted';

class Index extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      jobFound: null,
      job: {}

    };

    this.docParams = this.props.match.params;
  }

  componentWillMount() {
    const { firebase } = this.props;


    firebase.jobsBySlug(this.docParams.job).on('value', snapshot => {
      const job = snapshot.val();

      if (job) {
        snapshot.forEach(obj => {
          this.setState({
            job: obj.val(),
            jobFound: true
          });
        });
        console.log(this.state.job);
      }
    });
  }

  whatToRender = () => {
    if (this.state.job && this.state.job.privacy === 'private' || false) {
      return <Private title={ this.state.job.title } speakers={ this.state.job.speakers } />;
    } else if (this.state.job && !this.state.job.hasStarted && this.state.job.privacy === 'public' || true) {
      return <HasntStarted title={ this.state.job.title } speakers={ this.state.job.speakers } />;
    } else if (this.state.job && this.state.job.privacy === 'public' || true) {
      return <Viewer user={ this.docParams.user } job={ this.docParams.job } />;
    } else {
      return <p>This event and user combination was not found.</p>;
    }
  };

  render() {
    return <Viewer user={ this.docParams.user } job={ this.docParams.job } />
    // return this.whatToRender();
  }
}

export default withFirebase(Index);
