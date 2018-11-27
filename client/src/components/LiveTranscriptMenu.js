import React from 'react';
import { Button, Icon, Menu, Segment } from 'semantic-ui-react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import BlueMountain from '../assets/images/BlueMountain.png';
import {
  faCog
} from '@fortawesome/free-solid-svg-icons';

library.add(faCog);

class LiveTranscriptMenu extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeItem: 'home',
      isOpen: false
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    return (
      <>
        <Menu secondary>
          <Menu.Item position="left">
            <img
              alt="Aloft Blue Mountain Logo"
              className="liveTranscript--menu_blue-mountain"
              src={ BlueMountain } />
          </Menu.Item>
          <Menu.Item position='right'>
            <Button icon labelPosition='left'
                    size="huge" color="black">
              <Icon name='cog' />
              Settings
            </Button>
            <Button icon labelPosition='left'
                    size="huge"
                    color="violet"
                    onClick={this.props.scrollDown}>
              Return
              <Icon name='down arrow' />
            </Button>
          </Menu.Item>
        </Menu>
      </>
    );
  }
}

LiveTranscriptMenu.propTypes = {};

export default LiveTranscriptMenu;