import React from 'react';
import {
  Container,
  Row
} from 'reactstrap';
import LiveTranscript from './LiveTranscript';
import './LiveTranscriptView.css';

class LiveTranscriptView extends React.Component {
  constructor(props) {
    super(props);

  }

  handleClose = () => {
    this.setState({
      open: false
    });
  };

  handleClick = () => {
    this.setState({
      open: true
    });
  };

  render() {
    const { user, event } = this.props.match.params;

    return (
      <LiveTranscript
        user={ user }
        event={ event }
      />
    );
  }
}

export default LiveTranscriptView;