import React, { Component } from 'react';
import GenericBinding from 'sharedb-generic-binding';
import connection from './sharedb/connection';
import { Link, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll';
import IntersectionVisible from 'react-intersection-visible';
import Observer from 'react-intersection-observer';
import { css } from 'react-emotion';
import { SyncLoader } from 'react-spinners';
import LiveTranscriptMenu from './LiveTranscriptMenu';
import LiveTranscriptFloatingButtons from './LiveTranscriptFloatingButtons';

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
      menuVisible: false,
      path: []
    };

    this.liveTranscript = React.createRef();
    this.scrollDown = this.scrollDown.bind(this);
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
        data: doc.data
      });
      this.bind().then(() => {
        this.setState({
          loading: false
        });
        scroll.scrollToBottom({
          delay: 0,
          duration: 100,
          isDynamic: true
        });
      });
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
  onIntersect(atBottom) {
    if (!atBottom) {
      this.scrollDown();
    }
  }

  scrollDown() {
    scroll.scrollToBottom({
      delay: 0,
      duration: 200,
      isDynamic: true
    });

    this.setState({
      menuVisible: false
    });
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
    return (<div className="liveTranscript--container">
        { this.state.menuVisible && !this.state.loading
          ? <LiveTranscriptFloatingButtons scrollDown={ this.scrollDown } />
          : null
        }
        <div className='sweet-loading'>
          <SyncLoader
            className={ override }
            sizeUnit={ 'px' }
            size={ 13 }
            margin={ '6px' }
            color={ '#000' }
            loading={ this.state.loading }
          />
        </div>
        <div
          className="liveTranscript--text-format"
          onClick={() => {
            this.setState({
              menuVisible: true
            })
          }}
          ref={ this.liveTranscript } />
        <Observer
          threshold={ .1 }
          onChange={ state => this.onIntersect(state) }>
          { ({ inView, ref }) => (
            <div
              className="liveTranscript--container_observer"
              ref={ ref } />
          ) }
        </Observer>
      </div>
    );
  }
}

export default LiveTranscript;