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
import TextEditor from '../components/TranscriptEditField';

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

    const { classes } = this.props;
    const { open } = this.state;
    // const { user, event } = this.props.match.params;
    const { user, event } = queryString.parse(this.props.location.search);

    return (<div>
        <div className="mainEditor">
          <TextEditor
            user={ user }
            event={ event } />
        </div>
      </div>
    );
  }
}

export default TranscriptEditor;