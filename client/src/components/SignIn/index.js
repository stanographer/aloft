import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { withFirebase } from '../Firebase';
import {
  Button,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
  UncontrolledAlert
} from 'reactstrap';


import { PasswordForgetLink } from '../PasswordForget';
import { SignUpLink } from '../SignUp';
import * as ROUTES from '../../constants/routes';

const SignInPage = () => (
  <Container>
    <Row>
      <Col md="4" />
      <Col md="4">
        <SignInForm />
        <PasswordForgetLink />
        <SignUpLink />
      </Col>
      <Col md="4" />
    </Row>
  </Container>
);

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null
};

class SignInFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { email, password } = this.state;

    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.DASHBOARD);
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { email, password, error } = this.state;
    const isInvalid = password === '' || email === '';

    return (
      <div>
        <h1>Aloft Sign-In</h1>
        <Form onSubmit={ this.onSubmit }>
          <FormGroup row>
            <Label for="email" sm={ 4 } size="lg">Email</Label>
            <Col sm={ 8 }>
              <Input
                value={ email }
                onChange={ this.onChange }
                type="email"
                name="email"
                id="email"
                placeholder="Email address"
                bsSize="lg" />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="password" sm={ 4 } size="lg">Password</Label>
            <Col sm={ 8 }>
              <Input
                value={ password }
                onChange={ this.onChange }
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                bsSize="lg" />
            </Col>
          </FormGroup>
          { error &&
          <UncontrolledAlert color="danger">
            { error.message }
          </UncontrolledAlert> }
          <Button
            disabled={ isInvalid }
            type="submit"
            size="lg"
            block>
            Sign In
          </Button>
        </Form>
      </div>
    );
  }
}

const SignInForm = compose(
  withRouter,
  withFirebase
)(SignInFormBase);

export default SignInPage;

export { SignInForm };
