import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAlignJustify,
  faExpandArrowsAlt,
  faDownload,
  faFont,
  faPaintBrush,
  faPaperPlane,
  faShareSquare,
  faTextHeight
} from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import TextEditor from '../components/TranscriptEditField';
import {
  Button,
  ButtonGroup,
  ButtonToolbar,
  Col,
  Container,
  Dropdown, DropdownToggle, DropdownMenu, DropdownItem,
  Row
} from 'reactstrap';

class TranscriptEditor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dropdownOpen: false
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  render() {

    const { classes } = this.props;
    const { open } = this.state;
    // const { user, event } = this.props.match.params;
    const {user, event} = queryString.parse(this.props.location.search);

    return (<div>
        <Container fluid className="mainEditor">
          <Row>
            <Col xs="12">
              <ButtonToolbar className="editor--toolbar-group">
                <ButtonGroup className="editor--toolbar-button_group">
                  <Button size="lg" className="editor--toolbar-button"><FontAwesomeIcon icon={ faFont } /></Button>
                  <Button size="lg" className="editor--toolbar-button"><FontAwesomeIcon
                    icon={ faTextHeight } /></Button>
                  <Button size="lg" className="editor--toolbar-button"><FontAwesomeIcon
                    icon={ faAlignJustify } /></Button>
                  <Button size="lg" className="editor--toolbar-button"><FontAwesomeIcon
                    icon={ faPaintBrush } /></Button>
                </ButtonGroup>
                <ButtonGroup className="editor--toolbar-button_group">
                  <Button size="lg" className="editor--toolbar-button"><FontAwesomeIcon icon={ faDownload } /></Button>
                  <Button size="lg" className="editor--toolbar-button"><FontAwesomeIcon
                    icon={ faPaperPlane } /></Button>
                  <Button size="lg" className="editor--toolbar-button"><FontAwesomeIcon
                    icon={ faExpandArrowsAlt } /></Button>
                  <Button size="lg" className="editor--toolbar-button"><FontAwesomeIcon
                    icon={ faShareSquare } /></Button>
                </ButtonGroup>
              </ButtonToolbar>
            </Col>
          </Row>
          <Row>
            <Col xs="12">
              <TextEditor
                user={ user }
                event={ event } />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default TranscriptEditor;