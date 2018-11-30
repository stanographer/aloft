import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Link,
  Switch
} from 'react-router-dom';
import LiveTranscriptView from './components/LiveTranscriptView';
import TranscriptEditor from './components/TranscriptEditor';
import TranscriptEditorCopy from './components/TranscriptEditFieldCopy';
import './App.css';
import { bindActionCreators } from 'redux';
import { exampleAction } from './actions/actions';
import { connect } from 'react-redux';

// import route Components here
class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <Route
              path="/:user/:event"
              name="Transcript Editor"
              component={ LiveTranscriptView } />
            <Route
              path="/editor"
              name="Transcript Editor"
              component={ TranscriptEditor } />
            <Route
              path="/bedit"
              name="Transcript Editor 2"
              component={ TranscriptEditorCopy } />
          </div>
        </Router>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  propOne: state.state.propOne,
  propTwo: state.state.propTwo
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ exampleAction }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
