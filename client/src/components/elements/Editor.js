import React, { Component } from 'react';
import ShareDB from 'sharedb/lib/client';
import ReconnectingWebSocket from 'reconnecting-websocket';
import StringBinding from 'sharedb-string-binding';

class Editor extends Component {
  constructor() {
    super();

  }

  componentDidMount() {
    const socket = new ReconnectingWebSocket('ws://localhost:5000');
    const connection = new ShareDB.Connection(socket);
    const doc = connection.get('examples', 'textarea');
    const element = document.querySelector('textarea');

    doc.subscribe(function(err) {
      if (err) throw err;

      const binding = new StringBinding(element, doc);
      binding.setup();

    });
  }

  render() {

    return (
      <div>
        <textarea />
      </div>
    );
  }
}

export default Editor;