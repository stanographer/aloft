import React, { Component } from 'react';
import ShareDB from 'sharedb/lib/client';
import GenericBinding from 'sharedb-generic-binding';
import ReconnectingWebSocket from 'reconnecting-websocket';
import otText from 'ot-text';
import { Link, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll';
import Waypoint from 'react-waypoint';

class LiveTranscript extends Component {
  constructor(props) {
    super(props);

    this.liveTranscript = React.createRef();

    this.state = {
      doc: '',
      data: '',
      errors: '',
      scrolling: true
    };
  }

  createSocket() {
    const socket = new ReconnectingWebSocket('ws://localhost:5000', null, {
      automaticOpen: true,
      reconnectInterval: 2000,
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
        doc: this.doc,
        data: this.doc.data,
        scrolling: true
      }, this.createBinding);
      scroll.scrollToBottom();
    });

    this.doc.on('op', op => {
      // this.scrollToBottom();
    });
  }

  createBinding() {
    this.binding = new GenericBinding(this.liveTranscript.current, this.state.doc);
    this.binding.setup();
  }

  componentDidMount() {
    this.createSocket();
  }

  componentDidUpdate() {
    console.log('component updated!');
  }

  render() {
    return (
      <>
        <div
          className="liveTranscript--text-format"
          ref={ this.liveTranscript } />
        <Waypoint
          onEnter={ () => {
            scroll.scrollToBottom();
            console.log('waypoint entered');
          } }
          onLeave={ () => {
            scroll.scrollToBottom();
            console.log('waypoint has been left');
          } }
          onPositionChange={ () => {
            console.log('position has changed');
          } }
        />
      </>
    );
  }
}

export default LiveTranscript;