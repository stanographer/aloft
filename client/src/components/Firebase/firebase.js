import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID
};

const actionCodeSettings = {
  // URL you want to redirect back to. The domain (www.example.com) for this
  // URL must be whitelisted in the Firebase Console.
  url: 'https://www.example.com/finishSignUp?cartId=1234',
  // This must be true.
  handleCodeInApp: true
};

class Firebase {
  constructor() {
    app.initializeApp(config);

    this.auth = app.auth();
    this.db = app.database();
  }

  // Auth API

  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doCreateUserWithEmailLink = (email, actionCode) =>
    this.auth.sendSignInLinkToEmail(email, actionCode);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignInWithEmailLink = email =>
    this.auth.signInWithEmailLink(email);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = password =>
    this.auth.currentUser.updatePassword(password);

  // User API

  user = uid => this.db.ref(`users/${uid}`);

  users = () => this.db.ref('users');

  findUser = username => this.db.ref('users')
    .orderByChild('username')
    .equalTo(username);

  userJobList = uid => this.user(uid).child('jobs');

  deleteJobFromUser = slug =>
    this.user(this.auth.currentUser.uid)
      .child('jobs')
      .child(slug)
      .remove();

  // Jobs API

  allJobs = () => this.db.ref('jobs');

  allJobsList = () => this.db.ref('jobs').orderByKey();

  jobById = id => this.db.ref(`/jobs/${id}`);

  jobsBySlug = slug =>
    this.db.ref('jobs')
      .orderByChild('slug')
      .equalTo(slug);

  deleteJobFromJobs = uid =>
    this.db.ref('jobs')
      .child(`${uid}`)
      .remove();

  // Events API
  events = () => this.db.ref('events');
}

export default Firebase;
