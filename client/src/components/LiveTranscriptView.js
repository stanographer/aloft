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

    this.state = {
      backgroundColor: '#282f37'
    };
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
    const liveTranscriptStyle = {
      backgroundColor: this.state.backgroundColor
    };

    return (<Container fluid
      style={liveTranscriptStyle}>
        <Row>
            <LiveTranscript
              onScrolled={() => console.log('the list was scrolled')}
              user={ user }
              event={ event }
            />
        </Row>
      </Container>
    );
  }
}

export default LiveTranscriptView;