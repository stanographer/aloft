import React from 'react';
import { Button, Icon } from 'semantic-ui-react';

const LiveTranscriptFloatingButtons = (props) => (
  <div className="liveTranscript--buttons_floating">
    <Button icon labelPosition='left'
            size="huge" color="black">
      <Icon name='cog' />
      Settings
    </Button>
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