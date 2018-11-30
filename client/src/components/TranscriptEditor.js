import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAlignJustify,
  faExpandArrowsAlt,
  faDownload,
  faFont,
  faPaintBrush,
  faPaperPlane,
  faShareSquare,
  faTextHeight
} from '@fortawesome/free-solid-svg-icons';
import queryString from 'query-string';
import TranscriptEditField from '../components/TranscriptEditField';

class TranscriptEditor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dropdownOpen: false
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  render() {
    // const { user, event } = this.props.match.params;
    const { user, event } = queryString.parse(this.props.location.search);

    return (<div>
        <div className="mainEditor">
          <TranscriptEditField
            user={ user }
            event={ event } />
        </div>
      </div>
    );
  }
}

export default TranscriptEditor;
