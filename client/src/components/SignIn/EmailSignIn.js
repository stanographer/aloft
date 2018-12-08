import * as ROUTES from '../../constants/routes';

const { firebase, history } = this.props;
const {
  email,
  error,
  password
} = this.state;
const isInvalid = password === '' || email === '';

// Confirm the link is a sign-in with email link.
if (firebase.doSignInWithEmailLink(window.location.href)) {
  let email = window.localStorage.getItem('emailForSignIn');
  // The client SDK will parse the code from the link for you.
  firebase.doSignInWithEmailLink(email, window.location.href)
    .then(function(result) {
      // Clear email from storage.
      window.localStorage.removeItem('emailForSignIn');
      // You can access the new user via result.user
      // Additional user info profile not available via:
      // result.additionalUserInfo.profile == null
      // You can check if the user is new or existing:
      // result.additionalUserInfo.isNewUser
      return firebase.doSignInWithEmailLink(result);
    })
    .then(() => {
      this.setState({ ...INITIAL_STATE });
      history.push(ROUTES.DASHBOARD);
    })
    .catch(error => {
      // Some error occurred, you can inspect the code: error.code
      // Common errors could be invalid email and invalid or expired OTPs.
    });
}
