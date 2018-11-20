import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Link,
  Switch
} from 'react-router-dom';
import LiveTranscriptView from './components/LiveTranscriptView';
import './App.css';

// import route Components here
class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <div className="container">
            <ul>
              <li><Link to="/live">Live</Link></li>
            </ul>
            <hr />
            <Route path="/live" component={ LiveTranscriptView } />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;