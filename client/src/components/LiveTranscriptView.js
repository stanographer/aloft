import React from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import {
  Col,
  Container,
  Row
} from 'reactstrap';
import LiveTranscript from './LiveTranscript';
import './LiveTranscriptView.css';

class LiveTranscriptView extends React.Component {
  state = {
    open: false
  };

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

    return (<div>
        <Container>
          <Row>
            <LiveTranscript
              user={ user }
              event={ event }
            />
          </Row>
        </Container>
      </div>
    );
  }
}

export default LiveTranscriptView;