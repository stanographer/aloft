import React from 'react';
import { Container, Jumbotron, Button } from 'reactstrap';
import SrcconPowerLogo from '../../assets/images/srccon_power_logo.png';
import './index.css';

const HasntStarted = (props) => {
  return (
    <div>
      <Container>
        <div className="vertical-padding-5em" />
        <Jumbotron>
          <img src={ SrcconPowerLogo } className="img-fluid logo" />
          <p className="lead">"{ props.title }"</p>
          <p className="lead">{ props.speakers }</p>
          <hr className="my-2" />
          <p className="lead">This event hasn't started yet. Please check the schedule and this page will become the live captioning feed once the session begins. Thank you!</p>
          <Button color="primary" href="https://srccon.org">Return to SRCCON home.</Button>
        </Jumbotron>
      </Container>
    </div>
  );
};

export default HasntStarted;
