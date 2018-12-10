import React from 'react';
import { connect } from 'react-redux';
import ShareDBBinding from 'sharedb-react-textbinding';
import IntersectionObserver from 'react-intersection-observer';
import IntersectionVisible from 'react-intersection-visible';
import { css } from 'react-emotion';
import { SyncLoader } from 'react-spinners';
import FloatingButtons from './FloatingButtons';
import { animateScroll as scroll } from 'react-scroll';
import './index.css';
import connection from '../ShareDB/connection';

const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;

const mapStateToProps = state => {
  return {
    style: state.aloft_localstorage.style
  };
};

class ConnectedLiveTranscriptView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      menuVisible: false,
      style: {}
    };

    this.scrollDown = this.scrollDown.bind(this);
    this.onLoaded = this.onLoaded.bind(this);
  }

  onScrollToBottom(atBottom) {
    if (!atBottom) {
      this.scrollDown();
    }
  }

  onLoaded() {
    this.setState({
      loading: false
    }, this.scrollDown);
  }

  scrollDown() {
    setTimeout(() => {
      scroll.scrollToBottom({
        delay: 0,
        duration: 200,
        isDynamic: true
      });
    }, 0);

    this.setState({
      menuVisible: false
    });
  }

  componentWillUnmount() {
    this.doc.unsubscribe();
    this.doc.destroy();
  }

  render() {
    const { user, event } = this.props.match.params;
    const { loading, menuVisible, } = this.state;
    const { style } = this.props;

    this.doc = connection.get(user, event);

    return (
      <div className="liveTranscript--container">
        { menuVisible && !loading
          ? <FloatingButtons
            scrollDown={ this.scrollDown }
            style={ style } />
          : null
        }
        <div className='sweet-loading'>
          <SyncLoader
            className={ override }
            sizeUnit={ 'px' }
            size={ 13 }
            margin={ '6px' }
            color={ style.color }
            loading={ loading }
          />
        </div>
        <div className="liveTranscript"
             onClick={ () => {
               this.setState({
                 menuVisible: true
               });
             } }>
          <ShareDBBinding
            cssClass="liveTranscript--text-format"
            style={ style }
            doc={ this.doc }
            onLoaded={ this.onLoaded }
            flag='≈'
            elementType="div" />
        </div>
        <IntersectionObserver
          threshold={ .1 }
          onChange={ state => this.onScrollToBottom(state) }>
          { ({ inView, ref }) => (
            <div ref={ ref }
                 className="liveTranscript--container_observer"
                 style={ { backgroundColor: style.backgroundColor } } />
          ) }
        </IntersectionObserver>
      </div>
    );
  }
}

const LiveTranscriptView = connect(mapStateToProps, {})(ConnectedLiveTranscriptView);
export default LiveTranscriptView;
