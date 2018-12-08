import React from 'react';
import {
  Button,
  ButtonGroup
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCog, faArrowDown, faInfo, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import SettingsPanel from './SettingsPanel';

class FloatingButtons extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dropdownOpen: false,
      isPanelOpen: false
    };

    this.toggle = this.toggle.bind(this);
    this.panelToggle = this.panelToggle.bind(this);
    this.panelClose = this.panelClose.bind(this);
  }

  panelClose() {
    this.setState({
      isPanelOpen: false
    });
  }

  panelToggle() {
    this.setState({
      isPanelOpen: !this.state.isPanelOpen
    });
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  render() {
    library.add(faCog, faArrowDown, faInfo, faPaperPlane);

    return (
      <div className="liveTranscript--buttons_floating"
      hidden={this.state.isPanelOpen}>
        <SettingsPanel isPanelOpen={ this.state.isPanelOpen } panelClose={this.panelClose} />
        <ButtonGroup size="lg">
          <Button color="primary" onClick={ this.props.scrollDown }>
            <FontAwesomeIcon icon="arrow-down" />&nbsp;&nbsp;Return to Bottom
          </Button>
          <Button color="primary" onClick={ this.panelToggle }>
            <FontAwesomeIcon icon="cog" />
          </Button>
        </ButtonGroup>
      </div>
    );
  }
}

export default FloatingButtons;
