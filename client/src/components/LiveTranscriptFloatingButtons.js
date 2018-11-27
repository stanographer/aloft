import React from 'react';
import { Button, Icon } from 'semantic-ui-react';
import LiveTranscriptOptions from './LiveTranscriptOptions';

const LiveTranscriptFloatingButtons = (props) => (
  <div className="liveTranscript--buttons_floating">
    <LiveTranscriptOptions style={props.style} />
    <Button icon labelPosition='left'
            size="huge"
            color="violet"
            onClick={props.scrollDown}>
      Return
      <Icon name='down arrow' />
    </Button>
  </div>
);

export default LiveTranscriptFloatingButtons;