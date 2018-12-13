import React from 'react';
import { Container, Jumbotron, Button } from 'reactstrap';
import SrcconPowerLogo from '../../assets/images/srccon_power_logo.png';
import './index.css';

const Private = (props) => {
  return (
    <div>
      <Container>
        <div className="vertical-padding-5em" />
        <Jumbotron>
          <img src={ SrcconPowerLogo } className="img-fluid logo" />
          <p className="lead">"{ props.title }"</p>
          <p className="lead">{ props.speakers }</p>
            <hr className="my-2" />
            <p className="lead">This event has been marked by your event organizers as private. The transcript will be
              accessible after they've had a chance to look it over before making it public. Thank you for your
              understanding!.</p>
            <Button color="primary" href="https://srccon.org">Return to SRCCON home.</Button>
        </Jumbotron>
      </Container>
    </div>
  );
};

export default Private;
