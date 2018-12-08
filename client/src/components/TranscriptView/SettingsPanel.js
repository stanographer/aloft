import React, { Component } from 'react';
import { render } from 'react-dom';
import Modal from 'react-modal';
import SlidingPane from 'react-sliding-pane';
import 'react-sliding-pane/dist/react-sliding-pane.css';

class SettingsPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPanelOpen: false
    };
  }

  componentDidMount() {
    Modal.setAppElement(this.el);
  }

  render() {
    return (
    <div ref={ ref => this.el = ref }>
      <SlidingPane
        isOpen={ this.props.isPanelOpen }
        from='right'
        width='100%'
        onRequestClose={ this.props.panelClose }>
        <div>And I am pane content on left.</div>
      </SlidingPane>
    </div>
    );
  }
}

export default SettingsPanel;
