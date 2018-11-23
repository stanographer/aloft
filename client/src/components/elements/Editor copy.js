import React, { Component } from 'react';
import ShareDB from 'sharedb/lib/client';
import StringBinding from 'sharedb-string-binding';
import ReconnectingWebSocket from 'reconnecting-websocket';
import otText from 'ot-text';


class Editor extends Component {
  constructor(props) {
    super(props);

    this.el = React.createRef();

    this.state = {
      text: ''
    };

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const socket = new ReconnectingWebSocket('ws://localhost:5000', null, {
      automaticOpen: true,
      reconnectInterval: 3000,
      maxReconnectInterval: 3000,
      timeoutInterval: 5000,
      maxReconnectAttempts: null
    });
    const connection = new ShareDB.Connection(socket);
    ShareDB.types.register(otText.type);
    const doc = connection.get('stanley', 'momavideo1-2018-10-9');

    console.log(doc);
    const textEditor = this.el.current;

    doc.subscribe(function(err) {
      if (err) throw err;

      const binding = new StringBinding(textEditor, doc);
      binding.setup();
    });
  }

  handleChange() {
    this.setState({
      text: this.el.current.value
    });
  }

  render() {
    return (
      <div>
        <p>{this.state.text}</p>
        <TextField
          InputLabelProps={ { shrink: true } }
          multiline={ true }
          rows="20"
          variant="outlined" />
        <textarea
          ref={ this.el }
          onChange={ this.handleChange }
          value={ this.state.text }
          cols="200"
          rows="20" />
      </div>
    );
  }
}

export default Editor;