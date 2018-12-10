import React from 'react';
import {
  Button,
  ButtonGroup
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCog, faArrowDown, faInfo, faPaperPlane } from '@fortawesome/free-solid-svg-icons';

class FloatingButtons extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dropdownOpen: false,
      isPanelOpen: false
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  componentDidMount() {
    console.log(this.props.style);
  }

  render() {
    const { style } = this.props;
    library.add(faCog, faArrowDown, faInfo, faPaperPlane);

    return (
      <div className="liveTranscript--buttons_floating">
        <ButtonGroup size="lg">
          <Button color="primary" onClick={ this.props.scrollDown }>
            <FontAwesomeIcon icon="arrow-down" />&nbsp;&nbsp;Return to Bottom
          </Button>
            <Button color="primary" tag={Link} to="/transcript-view-tools">
              <FontAwesomeIcon icon="cog" />
            </Button>
        </ButtonGroup>
      </div>
    );
  }
}

export default FloatingButtons;
