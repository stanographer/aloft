import React, { Component } from 'react';
import ShareDB from 'sharedb/lib/client';
import StringBinding from 'sharedb-string-binding';
import ReconnectingWebSocket from 'reconnecting-websocket';
import connection from './sharedb/connection';
import ShareDBTextBinding from 'sharedb-react-textbinding';
import otText from 'ot-text';


class Editor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      doc: '',
      data: '',
      errors: ''
    };

    this.doc = connection.get(this.props.user, this.props.event);
  }

  componentWillUnmount() {
    this.doc.unsubscribe();
    this.doc.destroy();
  }

  render() {
    return (
      <ShareDBTextBinding
        doc={this.doc} />
    );
  }
}

export default Editor;
