import React, { Component } from 'react';
import GenericBinding from 'sharedb-generic-binding';
import connection from './sharedb/connection';
import { Link, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll';
import IntersectionVisible from 'react-intersection-visible';
import { css } from 'react-emotion';
import { PropagateLoader } from 'react-spinners';

const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;

class LiveTranscript extends Component {
  constructor(props) {
    super(props);

    this.state = {
      doc: '',
      data: '',
      errors: '',
      loading: true,
      path: []
    };

    this.liveTranscript = React.createRef();
  }

  subscribe() {
    const doc = connection.get(this.props.user, this.props.event);
    doc.subscribe(err => {
      if (err) console.log(err);
      if (doc.type === null) {
        this.setState({ error: 'No document with that user and event combination exists!' });
      }
    });

    doc.on('load', () => {
      this.setState({
        doc,
        data: doc.data,
        scrolling: true
      });
      this.bind().then(() => {
        this.setState({
          loading: false
        });
      });
      scroll.scrollToBottom();
    });

    doc.on('del', () => {
      doc.destroy();
      doc.unsubscribe();
      this.setState({ doc: null });
    });
  }

  async bind() {
    this.binding = new GenericBinding(
      this.liveTranscript.current,
      this.state.doc,
      this.state.path
    );
    this.binding.setup();
  }

  // Scrolls the body of the transcript if there is a transition
  // of visibility of the bottom of the page.
  static onIntersect() {
    scroll.scrollToBottom();
  }

  componentWillMount() {
    this.subscribe();
  }

  componentWillUnmount() {
    if (this.binding) {
      this.binding.destroy();
      this.setState({
        doc: null,
        path: null
      });
    }
  }

  render() {
    return (
      <>
        <div className='sweet-loading'>
          <PropagateLoader
            className={override}
            sizeUnit={"px"}
            size={13}
            margin={"6px"}
            color={'#fff'}
            loading={this.state.loading}
          />
        </div>
        <div
          className="liveTranscript--text-format"
          ref={ this.liveTranscript } />
        <IntersectionVisible
          onIntersect={ e => LiveTranscript.onIntersect(e) } />
      </>
    );
  }
}

export default LiveTranscript;