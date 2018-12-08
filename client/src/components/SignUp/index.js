import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import { compose } from 'recompose';
import {
  Alert,
  Button,
  Col,
  Container,
  Form,
  FormFeedback,
  FormGroup,
  FormText,
  Input,
  Label
} from 'reactstrap';

import * as ROUTES from '../../constants/routes';

const SignUpPage = () => (
  <div>
    <h1>SignUp</h1>
    <SignUpForm />
  </div>
);

const INITIAL_STATE = {
  fullName: '',
  fullNameValid: null,
  parsedName: {},
  username: '',
  usernameIsValid: null,
  email: '',
  emailValid: null,
  emailAvailable: null,
  passwordOne: '',
  passwordTwo: '',
  passwordStrength: {},
  privilegeLevel: '',
  usersList: [],
  error: null
};

class SignUpFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = INITIAL_STATE;
  }

  componentWillUnmount() {
    if (this.props.firebase) this.props.firebase.users().off();
  }

  onSubmit = event => {
    const {
      parsedName,
      username,
      email,
      passwordOne,
      privilegeLevel
    } = this.state;

    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        return this.props.firebase
          .user(authUser.user.uid)
          .set({
            firstName: parsedName.first,
            lastName: parsedName.last,
            privilegeLevel: privilegeLevel,
            username: username,
            email: email
          });
      })
      .then(authUser => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.DASHBOARD);
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  };

  onChange = event => {
    if (event.target.name === 'passwordOne') this.analyzePassword(event.target.value);
    if (event.target.name === 'fullName') this.parseName(event.target.value);
    if (event.target.name === 'email') this.onTypeEmail(event.target.value);

    this.setState({
      [event.target.name]: event.target.value
    });
  };

  // The search through Firebase for matches once the user types in their email address.
  onTypeEmail = email => {
    const typingInterval = 3000;
    if (this.timeOut) clearTimeout(this.timeOut);

    // Check to see if it's a valid email.
    // this.validateEmail(email);

    // Check to see if the email already exists on the server.
    this.timeOut = setTimeout(() => {
      this.props.firebase.users().once('value', snapshot => {
        // If the snapshot is null, that means there's no users! So allow user to sign up.
        if (!snapshot.val()) return this.setState({ emailAvailable: true });

        const usersObject = snapshot.val();
        console.log(snapshot.val());
        if (snapshot.val()) {
          const emails = Object.keys(usersObject).map(key => ({
            ...usersObject[key],
            uid: key
          }));
          console.log(emails);
        }
      }).catch(err => console.log('error! ' + err));
    }, typingInterval);
  };

  validateEmail = email => {
    const rules = email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
    console.log('test', rules.test(email));
    return this.setState({ emailValid: rules.test(email) });
  };

  parseName = name => {
    console.log(name);
    let nameVar = name.trim(); // Trim any excess spaces.

    try {
      let nameObject = {
        firstName: '',
        middleName: '',
        lastName: ''
      };

      const nameArr = nameVar.split(' '); // Split the name into an array.

      switch (nameArr.length) {
        case 1:
          nameObject.firstName = nameArr[0];
          this.setState({
            fullNameValid: false,
            error: 'You must supply at minimum a first and last name.'
          });
          break;
        case 2:
          nameObject.firstName = nameArr[0];
          nameObject.lastName = nameArr[1];
          this.setState({ error: '' });
          break;

        case 3:
          nameObject.firstName = nameArr[0];
          nameObject.middleName = nameArr[1];
          nameObject.lastName = nameArr[2];
          this.setState({ error: '' });
          break;
        default:
          this.setState({
            fullNameValid: false,
            error: 'Names must be at maximum three components long: first name, middle name, last name.'
          });
          break;
      }

      // If the returned object doesn't have first name and last name properties at minimum, return out.
      if (!(nameObject.firstName && nameObject.lastName)) {
        return;
      }

      return this.setState({
        fullNameValid: true,
        parsedName: {
          first: nameObject.firstName,
          middle: nameObject.middleName ? nameObject.middleName : '',
          last: nameObject.lastName
        }
      });
    } catch (err) {
      this.setState({
        fullNameValid: false,
        error: 'Name can only have at most three components: a first, middle, and a last name.'
      });
    }
  };

  // Analyzing passwords and spits out helper messages to the user to make sure they meet requirements.
  analyzePassword = password => {
    let passwordStrength = {
      strength: 'weak',
      message: 'Must be longer than 0 characters.'
    };

    const rules = {
      all: new RegExp('^(?=.*[A-Za-z.\s_-])(?=.*[0-9])(?=.*[!@#$%^&*()><,.\'\":;=+])(?=.{6,})'),
      atLeastSix: new RegExp('^(?=.{6,})'),
      containsAlpha: new RegExp('^(?=.*[A-Za-z.\s_-])'),
      containsNum: new RegExp('^(?=.*[0-9])'),
      containsSymbol: new RegExp('^(?=.*[!@#$%^&*()?><,.\'\":;=+])'),
      isntCommon: new RegExp('^(?!.*pass|.*word|.*1234|.*123|.*qwer|.*asdf|.*home|.*hello|.*welcome)')
    };

    switch (password && password.length > 0) {
      case !rules.atLeastSix.test(password):
        passwordStrength.message = 'Password must at least 6 characters.';
        passwordStrength.strength = 'medium';
        break;
      case !rules.containsAlpha.test(password):
        passwordStrength.strength = 'weak';
        passwordStrength.message = 'Password must contain letters.';
        break;
      case !rules.containsSymbol.test(password):
        passwordStrength.strength = 'medium';
        passwordStrength.message = 'Password must contain at least one symbol (!, @, #, $, etc.).';
        break;
      case !rules.isntCommon.test(password):
        passwordStrength.strength = 'weak';
        passwordStrength.message = 'Password must not contain common sequences ("pass", "qwerty", "1234", etc.).';
        break;
      case !rules.containsNum.test(password):
        passwordStrength.message = 'Password must contain at least 1 numeral.';
        passwordStrength.strength = 'medium';
        break;
      case rules.all.test(password):
        passwordStrength.strength = 'strong';
        passwordStrength.message = 'Password is nice and strong.';
        break;
      default:
        break;
    }

    return this.setState({ passwordStrength });
  };

  render() {

    const {
      fullName,
      fullNameValid,
      username,
      email,
      emailValid,
      emailAvailable,
      parsedName,
      passwordOne,
      passwordTwo,
      passwordStrength,
      privilegeLevel,
      usersList,
      error
    } = this.state;

    const isInvalid =
      // privilegeLevel === '' ||
      username === '' ||
      fullNameValid === '' ||
      email === '' ||
      passwordTwo === '' ||
      passwordStrength.strength !== 'strong';

    return (
      <Container>
        <h1>Aloft Sign-Up</h1>
        {/*Email formgroup*/ }
        <Form onSubmit={ this.onSubmit }>
          <FormGroup row>
            <Label
              for="Full Name"
              sm={ 2 }
              size="lg">Full Name</Label>
            <Col sm={ 10 }>
              <Input
                bsSize="lg"
                onChange={ this.onChange }
                type="text"
                name="fullName"
                id="fullName"
                placeholder="(i.e. Charles Li)"
                valid={ fullNameValid } />
              <FormFeedback valid>Sweet! That name works!</FormFeedback>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label
              size="lg"
              for="Email"
              sm={ 2 }>
              Email
            </Label>
            <Col sm={ 10 }>
              <Input
                bsSize="lg"
                type="text"
                name="email"
                id="email"
                placeholder="(i.e. charlesli@gmail.com)"
                value={ email }
                // onKeyUp={ this.onTypeEmail }
                onChange={ this.onChange }
                valid={ emailValid && emailAvailable } />
              <FormFeedback valid={ this.state.emailAvailable }>Sweet! that email is valid and available!</FormFeedback>
              { emailValid && !emailAvailable
                ? <FormFeedback invalid="true">The email is valid but is not available.</FormFeedback>
                : ''
              }
              { !emailValid
                ? <FormFeedback invalid="true">The email is badly formatted.</FormFeedback>
                : ''
              }

            </Col>
          </FormGroup>
          {/*End Email form group*/ }
          {/*Username form group*/ }
          <FormGroup row>
            <Label
              for="username"
              sm={ 2 }
              size="lg">
              Username
            </Label>
            <Col sm={ 10 }>
              <Input
                type="text"
                name="username"
                value={ username }
                onChange={ this.onChange }
                id="username"
                placeholder="(i.e. licharles"
                bsSize="lg" />
            </Col>
          </FormGroup>
          {/*End username form group*/ }
          {/*passwordOne form group*/ }
          <FormGroup row>
            <Label
              size="lg"
              for="passwordOne"
              sm={ 2 }>Password</Label>
            <Col sm={ 10 }>
              <Input
                type="password"
                name="passwordOne"
                id="passwordOne"
                placeholder="Password"
                bsSize="lg"
                value={ passwordOne }
                onChange={ this.onChange }
                valid={ passwordStrength.strength === 'strong' }
                invalid={ passwordStrength.strength !== 'strong' && passwordOne.length > 0 }
              />
              { passwordStrength.strength === 'strong'
                ? <FormFeedback valid>
                  { this.state.passwordStrength.message }
                </FormFeedback>
                : null }
              { passwordStrength.strength === 'medium'
                ? <FormFeedback invalid="true">
                  { this.state.passwordStrength.message }
                </FormFeedback>
                : null }
              { passwordStrength.strength === 'weak'
                ? <FormFeedback invalid="true">
                  { this.state.passwordStrength.message }
                </FormFeedback>
                : null }

              <FormText>Passwords must be at least 6 characters long, 1 numeric character, and 1 special character
                (@,%,^,*, etc.).</FormText>
            </Col>
          </FormGroup>
          {/*End passwordOne form group*/ }
          {/*passwordTwo form group*/ }
          <FormGroup row>
            <Label
              for="passwordOne"
              sm={ 2 }
              size="lg">Confirm password</Label>
            <Col sm={ 10 }>
              <Input
                type="password"
                name="passwordTwo"
                id="passwordTwo"
                placeholder="Confirm password"
                bsSize="lg"
                value={ passwordTwo }
                onChange={ this.onChange }
                valid={ passwordOne === passwordTwo && passwordTwo !== '' }
                invalid={ passwordOne !== passwordTwo && passwordTwo.length > 0 }
              />
              { passwordOne === passwordTwo
                ? <FormFeedback valid>
                  Nice! Passwords are looking good!
                </FormFeedback>
                : null }
              { passwordOne !== passwordTwo
                ? <FormFeedback invalid="true">
                  Confirmation password must match original.
                </FormFeedback>
                : null }
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label
              for="privilegeLevel"
              sm={ 2 }
              size="lg">Privilege level</Label>
            <Col sm={ 10 }>
              <Input
                bsSize="lg"
                value={ this.state.privilegeLevel }
                onChange={ this.onChange }
                type="select"
                id="privilegeLevel"
                name="privilegeLevel">
                <option value="provider">Provider (stenographer)</option>
                <option value="consumer">Consumer</option>
                <option value="admin">Administrator</option>
              </Input>
            </Col>
          </FormGroup>
          {/*End passwordTwo form group*/ }
          { error && <Alert color="danger">
            { error || error.message }
          </Alert> }

          <Button
            color="primary"
            size="lg"
            block
            // disabled={ isInvalid }
            type=" submit">
            Create new account
          </Button>
        </Form>
      </Container>
    );
  }
}

const SignUpLink = () => (
  <p>
    Don't have an account? <Link to={ ROUTES.SIGN_UP }>Sign Up</Link>
  </p>
);

const SignUpForm = compose(withRouter, withFirebase)(SignUpFormBase);

export default SignUpForm;

export { SignUpForm, SignUpLink };
