import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateStyle, resetStyle } from '../../actions';
import {
  Button,
  Card,
  CardBody,
  CardImg,
  CardText,
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
import { ChromePicker } from 'react-color';
import SlidingPane from 'react-sliding-pane';
import 'react-sliding-pane/dist/react-sliding-pane.css';

import AloftBlueMountain from '../../assets/images/BlueMountain.png';
import BrowserBarImage from '../../assets/images/aloft_browser_bar.png';

const mapStateToProps = state => {
  return {
    style: state.aloft_localstorage.style
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateStyle: (style) => dispatch(updateStyle(style)),
    resetStyle: () => dispatch(resetStyle())
  };
};

class ConnectedTranscriptViewTools extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      colors: false,
      information: false,
      textOptions: true,
      file: false
    };

    this.onClick = this.onClick.bind(this);
    this.onStyleChange = this.onStyleChange.bind(this);
    this.goBack = this.goBack.bind(this);
  }

  onColorChange(e) {
    let stylePayload = {
      id: 'color'
    };

    stylePayload.value = e.hex;
    return this.props.updateStyle(stylePayload);
  }

  onBackgroundColorChange(e) {
    let stylePayload = {
      id: 'backgroundColor'
    };

    stylePayload.value = e.hex;
    return this.props.updateStyle(stylePayload);
  }

  // Sends style-change props to Redux.
  onStyleChange(e) {
    let stylePayload = {};
    let val;

    stylePayload.id = e.target.id;

    if (e.target.id === 'fontSize' || 'lineHeight' || 'margin') {
      val = Math.abs(e.target.value);
      if (e.target.value && e.target.value > -1 && e.target.value < 100) {
        val += 'em';
      } else {
        val = '1em';
      }
    }

    if (e.target.id === 'textTransform') {
      if (e.target.checked) {
        val = 'uppercase';
      } else {
        val = 'unset';
      }
    }


    stylePayload.value = val;
    console.log(e.target.id, val);
    console.log('target', e.target.checked);
    console.log(stylePayload);
    return this.props.updateStyle(stylePayload);
  }

  goBack(){
    this.props.history.goBack();
  }


  onClick(field) {
    const fields = {
      colors: false,
      information: false,
      textOptions: true,
      file: false
    };

    switch (field) {
      // Text options
      case 1:
        fields.colors = false;
        fields.information = false;
        fields.textOptions = true;
        fields.file = false;
        break;
      // Colors
      case 2:
        fields.colors = true;
        fields.information = false;
        fields.textOptions = false;
        fields.file = false;
        break;
      // Information
      case 3:
        fields.colors = false;
        fields.information = true;
        fields.textOptions = false;
        fields.file = false;
        break;
      // Transcript file
      case 4:
        fields.colors = false;
        fields.information = false;
        fields.textOptions = false;
        fields.file = true;
        break;
      default:
        break;
    }
    return this.setState({
      colors: fields.colors,
      information: fields.information,
      textOptions: fields.textOptions,
      file: fields.file
    });
  }

  render() {
    library.add(faTimes);

    const {
      backgroundColor,
      color,
      fontSize,
      fontFamily,
      lineHeight,
      margin,
      textTransform
    } = this.props.style;
    return (
      <>
        <div className="settings-panel__close-button" onClick={this.goBack}>
          <FontAwesomeIcon icon="times" onClick={this.goBack} />
        </div>
        <Container className="transcript-view-tools__container">
          <Row>
            {/*Left column*/ }
            <Col md={ 4 } className="settings-panel__column-left">
              <div className="settings-panel__column-left--header-group">
                <img src={ AloftBlueMountain } className="img-fluid" width="25%" alt="Aloft Blue Mountain Logo" />
                <h2>Settings</h2>
                <p>Aloft Version 5.0</p>
              </div>
              <ListGroup>
                <ListGroupItem
                  onClick={ () => this.onClick(1) }
                  active={ this.state.textOptions }
                  action>Text Appearance</ListGroupItem>
                <ListGroupItem
                  onClick={ () => this.onClick(2) }
                  active={ this.state.colors }
                  action>Colors</ListGroupItem>
                <ListGroupItem
                  onClick={ () => this.onClick(3) }
                  active={ this.state.information }
                  action>Information</ListGroupItem>
                <ListGroupItem
                  onClick={ () => this.onClick(4) }
                  active={ this.state.file }
                  action>Transcript File</ListGroupItem>
              </ListGroup>
              <div className="vertical-padding-5em" />
              <Button color="danger" onClick={ this.props.resetStyle }>Reset to default</Button>
            </Col>
            {/*Right Column*/ }
            <Col md={ 8 } className="settings-panel__column-right">
              {/*Look & Feel panel*/ }
              <div className="settings-panel__column-right-settings" hidden={ !this.state.textOptions }>
                <div className="settings-panel__column-right--header-group">
                  {/*<h3>Look & Feel</h3>*/ }
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
                  {/*Font size*/ }
                  <FormGroup row>
                    <Label for="fontSize" sm={ 6 }>Font size</Label>
                    <Col sm={ 6 }>
                      <InputGroup>
                        <Input type="text"
                               name="fontSize"
                               id="fontSize"
                               placeholder="(e.g. 3)"
                               defaultValue={ fontSize && fontSize.split('e')[0] }
                               onChange={ e => this.onStyleChange(e) }
                        />
                        <InputGroupAddon addonType="append">em</InputGroupAddon>
                      </InputGroup>
                    </Col>
                  </FormGroup>
                  {/*Font size end*/ }
                  {/*Line height*/ }
                  <FormGroup row>
                    <Label for="lineHeight" sm={ 6 }>Line Height</Label>
                    <Col sm={ 6 }>
                      <InputGroup>
                        <Input type="text"
                               name="lineHeight"
                               id="lineHeight"
                               placeholder="(e.g. 1)"
                               defaultValue={ lineHeight && lineHeight.split('e')[0] }
                               onChange={ e => this.onStyleChange(e) } />
                        <InputGroupAddon addonType="append">em</InputGroupAddon>
                      </InputGroup>
                    </Col>
                  </FormGroup>
                  {/*Line height end*/ }
                  {/*All caps*/ }
                  <FormGroup row>
                    <Label for="textTransform" sm={ 6 }>All caps</Label>
                    <Col sm={ 6 }>
                      <span className="clearfix" />
                      <Label className="custom-toggle">
                        <Input type="checkbox"
                               name="textTransform"
                               id="textTransform"
                               defaultChecked={ textTransform === 'uppercase' }
                               onChange={ e => this.onStyleChange(e) } />
                        <span className="custom-toggle-slider rounded-circle" />
                      </Label>
                    </Col>
                  </FormGroup>
                  {/*All caps end*/ }
                </Form>
                {/*Transcript preview*/ }
                <Card style={ { backgroundColor: this.props.style.backgroundColor } }>
                  <CardImg top width="100%"
                           src={ BrowserBarImage }
                           alt="Captions Preview" />
                  <CardBody className="settings-panel__column-right--preview">
                    <CardText style={ this.props.style }>Hello, hello, baby. You called, I can't hear a thing. I have
                      got
                      no service in the club, you see, see. Wha-wha-what did you say? Oh, you're breaking up on me.
                      Sorry,
                      I cannot hear you. I'm kinda busy. K-kinda busy. K-kinda busy. Sorry, I cannot hear you. I'm kinda
                      busy</CardText>
                  </CardBody>
                </Card>
                {/*Transcript preview end*/ }
              </div>
              {/*End Text Settings panel*/ }
              {/*Colors panel*/ }
              <div className="settings-panel__column-right-information" hidden={ !this.state.colors }>
                <Row>
                  <Col sm={ 6 }>
                    <ChromePicker color={ color }
                                  id="color"
                                  name="color"
                                  onChangeComplete={ e => this.onColorChange(e) } />
                    <Label for="textColor" sm={ 12 }>Text color</Label>
                  </Col>
                  <Col sm={ 6 }>
                    <ChromePicker color={ backgroundColor }
                                  id="backgroundColor"
                                  name="backgroundColor"
                                  onChangeComplete={ e => this.onBackgroundColorChange(e) } />
                    <Label for="backgroundColor" sm={ 12 }>Background color</Label>
                  </Col>
                </Row>
                {/*Transcript preview*/ }
                <Card style={ { backgroundColor: this.props.style.backgroundColor } }>
                  <CardImg top width="100%"
                           src={ BrowserBarImage }
                           alt="Captions Preview" />
                  <CardBody className="settings-panel__column-right--preview">
                    <CardText style={ this.props.style }>Hello, hello, baby. You called, I can't hear a thing. I have
                      got
                      no service in the club, you see, see. Wha-wha-what did you say? Oh, you're breaking up on me.
                      Sorry,
                      I cannot hear you. I'm kinda busy. K-kinda busy. K-kinda busy. Sorry, I cannot hear you. I'm kinda
                      busy</CardText>
                  </CardBody>
                </Card>
                {/*Transcript preview end*/ }
                {/*Colors end*/ }
              </div>
              {/*End information panel*/ }
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
      </>
    );
  }
}

const TranscriptViewTools = connect(mapStateToProps, mapDispatchToProps)(ConnectedTranscriptViewTools);
export default TranscriptViewTools;
