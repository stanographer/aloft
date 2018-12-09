import React, { Component } from 'react';
import Modal from 'react-modal';
import {
  Button,
  Col,
  Container,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Form,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  Jumbotron,
  Label,
  ListGroup,
  ListGroupItem,
  Row,
  UncontrolledDropdown
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { SliderPicker } from 'react-color';
import SlidingPane from 'react-sliding-pane';
import 'react-sliding-pane/dist/react-sliding-pane.css';

import AloftBlueMountain from '../../assets/images/BlueMountain.png';

class SettingsPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPanelOpen: false
    };
  }

  componentDidMount() {
    Modal.setAppElement(this.el);
  }

  render() {
    library.add(faTimes);
    return (
      <div ref={ ref => this.el = ref }>
        <SlidingPane
          closeIcon={ <FontAwesomeIcon icon="times" /> }
          isOpen={ this.props.isPanelOpen }
          from='right'
          width='100%'
          onRequestClose={ this.props.panelClose }>
          <Panel />
        </SlidingPane>
      </div>
    );
  }
}

class Panel extends React.Component {
  constructor() {
    super();

    this.state = {
      information: false,
      lookAndFeel: true,
      file: false
    };

    this.onClick = this.onClick.bind(this);
  }

  onClick(field) {
    const fields = {
      information: false,
      lookAndFeel: true,
      file: false
    };

    switch (field) {
      case 1:
        fields.information = false;
        fields.lookAndFeel = true;
        fields.file = false;
        break;
      case 2:
        fields.information = true;
        fields.lookAndFeel = false;
        fields.file = false;
        break;
      case 3:
        fields.information = false;
        fields.lookAndFeel = false;
        fields.file = true;
        break;
      default:
        break;
    }
    return this.setState({
      information: fields.information,
      lookAndFeel: fields.lookAndFeel,
      file: fields.file
    });
  }

  render() {
    return (
      <Container>
        <Row>
          {/*Left column*/ }
          <Col md={ 4 } className="settings-panel__column-left">
            <div className="settings-panel__column-left--header-group">
              <img src={AloftBlueMountain} className="img-fluid" width="25%" alt="Aloft Blue Mountain Logo" />
              <h2>Settings</h2>
              <p>Aloft Version 5.0</p>
            </div>
            <ListGroup>
              <ListGroupItem
                onClick={ () => this.onClick(1) }
                active={ this.state.lookAndFeel }

                action>Look & Feel</ListGroupItem>
              <ListGroupItem
                onClick={ () => this.onClick(2) }
                active={ this.state.information }

                action>Information</ListGroupItem>
              <ListGroupItem
                onClick={ () => this.onClick(3) }
                active={ this.state.file }

                action>Transcript File</ListGroupItem>
            </ListGroup>
          </Col>
          {/*Right Column*/ }
          <Col md={ 8 } className="settings-panel__column-right">
            {/*Look & Feel panel*/ }
            <div className="settings-panel__column-right-settings" hidden={ !this.state.lookAndFeel }>
              <div className="settings-panel__column-right--header-group">
                {/*<h3>Look & Feel</h3>*/}
              </div>
              <Form>
                <FormGroup row>
                  <Label for="fontFamily" sm={ 6 }>Font family</Label>
                  <Col sm={ 6 }>
                    <UncontrolledDropdown>
                      <DropdownToggle caret>
                        Dropdown
                      </DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem header>Header</DropdownItem>
                        <DropdownItem disabled>Action</DropdownItem>
                        <DropdownItem>Another Action</DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem>Another Action</DropdownItem>
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  </Col>
                </FormGroup>
                {/*Font size*/}
                <FormGroup row>
                  <Label for="fontSize" sm={ 6 }>Font size</Label>
                  <Col sm={ 6 }>
                    <InputGroup>
                      <Input type="text" name="fontSize" id="fontSize" placeholder="(e.g. 3)" step={0.5} />
                      <InputGroupAddon addonType="append">em</InputGroupAddon>
                    </InputGroup>
                  </Col>
                </FormGroup>
                {/*Font size end*/}
                {/*Line height*/}
                <FormGroup row>
                  <Label for="lineHeight" sm={ 6 }>Line Height</Label>
                  <Col sm={ 6 }>
                    <InputGroup>
                      <Input type="text" name="lineHeight" id="lineHeight" placeholder="(e.g. 1)" />
                      <InputGroupAddon addonType="append">em</InputGroupAddon>
                    </InputGroup>
                  </Col>
                </FormGroup>
                {/*Line height end*/}
                {/*All caps*/}
                <FormGroup row>
                  <Label for="allCaps" sm={ 6 }>Capitalization</Label>
                  <Col sm={ 6 }>
                    <span className="clearfix" />
                    <Label className="custom-toggle">
                      <Input type="checkbox" name="allCaps" id="allCaps" />
                        <span className="custom-toggle-slider rounded-circle" />
                    </Label>
                  </Col>
                </FormGroup>
                {/*All caps end*/}
                {/*Colors*/}
                <FormGroup row>
                  <Label for="textColor" sm={ 6 }>Text color</Label>
                  <Col sm={ 6 }>
                    <SliderPicker />
                  </Col>
                </FormGroup>
                {/*Colors end*/}
                {/*Colors*/}
                <FormGroup row>
                  <Label for="bgColor" sm={ 6 }>Background color</Label>
                  <Col sm={ 6 }>
                    <SliderPicker />
                  </Col>
                </FormGroup>
                {/*Colors end*/}
              </Form>
            </div>
            {/*End Settings panel*/ }
            {/*Information panel*/ }
            <div className="settings-panel__column-right-information" hidden={ !this.state.information }>
              <h3>Information</h3>
              <Jumbotron>
                <p className="lead">This is a simple hero unit, a simple Jumbotron-style component for calling extra
                  attention to featured content or information.</p>
                <hr className="my-2" />
                <p>It uses utility classes for typography and spacing to space content out within the larger
                  container.</p>
                <p className="lead">
                  <Button color="primary">Learn More</Button>
                </p>
              </Jumbotron>
            </div>
            {/*End information panel*/ }
            {/*Transcript File panel*/ }
            <div className="settings-panel__column-right-information" hidden={ !this.state.file }>
              <h3>Transcript File</h3>

            </div>
            {/*End transcript file panel*/ }
          </Col>
        </Row>
      </Container>
    );
  }
}


export default SettingsPanel;
