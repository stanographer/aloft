import React, { Component } from 'react';
import ShareDB from 'sharedb/lib/client';
import GenericBinding from 'sharedb-generic-binding';
import ReconnectingWebSocket from 'reconnecting-websocket';
import otText from 'ot-text';


class Editor extends Component {
  constructor(props) {
    super(props);

    this.liveTranscript = React.createRef();

    this.state = {
      doc: '',
      data: '',
      errors: ''
    };
  }

  createSocket() {
    const socket = new ReconnectingWebSocket('ws://localhost:5000', null, {
      automaticOpen: true,
      reconnectInterval: 3000,
      maxReconnectInterval: 3000,
      timeoutInterval: 5000,
      maxReconnectAttempts: null
    });

    this.subscribeToDoc(socket);
  }

  subscribeToDoc(socket) {
    const connection = new ShareDB.Connection(socket);
    ShareDB.types.register(otText.type);

    this.doc = connection.get(this.props.user, this.props.event);

    this.doc.subscribe(err => {
      if (err) console.log(err);
      if (this.doc.type === null) {
        this.setState({
          error: 'No document with this user/event combination exists!'
        });
      }
    });

    this.doc.on('load', () => {
      this.setState({
        doc: this.doc
      }, this.createBinding);
    });
  }

  createBinding() {
    this.binding = new GenericBinding(this.liveTranscript.current, this.state.doc);
    this.binding.setup();
  }

  componentDidMount() {
    this.createSocket();
  }

  render() {
    return (
      <div className="liveTranscriptContainer">
        <div
          className="liveTranscript--text-format"
          ref={ this.liveTranscript } />
      </div>
    );
  }
}

export default Editor;