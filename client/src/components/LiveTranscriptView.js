import React from 'react';
import LiveTranscript from './LiveTranscript';
import './LiveTranscriptView.css';

class LiveTranscriptView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      backgroundColor: '#262A38',
      fontSize: '3em',
      fontFamily: 'Cousine',
      textColor: '#F2F2F2'
    }
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
    const style = {
      backgroundColor: this.props.backgroundColor || this.state.backgroundColor,
      fontSize: this.props.fontSize || this.state.fontSize,
      fontFamily: this.props.fontFamily || this.state.fontFamily,
      color: this.props.textColor || this.state.textColor
    };

    const { user, event } = this.props.match.params;

    return (
      <>
        <LiveTranscript
          style={ style }
          user={ user }
          event={ event }
        />
      </>
    );
  }
}

export default LiveTranscriptView;