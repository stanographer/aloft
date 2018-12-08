import React from 'react';
import { withAuthorization } from '../Session';
import {
  Button,
  Col,
  Container,
  Form,
  FormGroup,
  FormText,
  Input,
  Label,
  Row
} from 'reactstrap';

const Dashboard = () => (
  <Container>
    <div className="header--h1-margins">
      <h1>Dashboard</h1>
    </div>
    <Form>
      <FormGroup row>
        <Label for="Event Name" sm={ 2 }>Name</Label>
        <Col sm={ 10 }>
          <Input
            bsSize="lg"
            type="text"
            name="event"
            id="event" placeholder="Enter Event Name" />
        </Col>
      </FormGroup>
      <FormGroup check row>
        <Col sm={ { size: 10, offset: 2 } }>
          <Button>Submit</Button>
        </Col>
      </FormGroup>
    </Form>
  </Container>
);

const condition = authUser => !!authUser;
export default withAuthorization(condition)(Dashboard);
