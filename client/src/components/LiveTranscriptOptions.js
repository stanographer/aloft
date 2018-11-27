import React from 'react';
import {
  Button,
  Checkbox,
  Dropdown,
  Form,
  Grid,
  Header,
  Icon,
  Image,
  Input,
  Modal
} from 'semantic-ui-react';
import { ChromePicker } from 'react-color';
import AloftLogoBlack from '../assets/images/aloftlogoblack.png';

const languageOptions = [
  { key: 'Roboto', text: 'Roboto', value: 'Roboto' },
  { key: 'Arabic', text: 'Arabic', value: 'Arabic' }
];

class LiveTranscriptOptions extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
       fontSize: ''
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      fontSize: nextProps.style.fontSize
    });
  }

  render() {
    return (
      <Modal dimmer="blurring"
             closeIcon
             trigger={
               <Button icon labelPosition='left'
                       size="huge"
                       color="teal">
                 <Icon name='cog' />
                 Tools
               </Button>
             }>
        <Modal.Header><Icon name="cog" /> Tools</Modal.Header>
        <Modal.Content image scrolling>
          <Image
            size='small'
            src={ AloftLogoBlack }
            wrapped />

          <Modal.Description>
            <Header><Icon name='font' /> Font style</Header>
            <Dropdown
              button
              className='icon'
              floating
              labeled
              icon='font'
              options={ languageOptions }
              text='Select Font'
            />

            <Header><Icon name='text height' /> Font size</Header>
            <Input label={ { basic: true, content: 'em' } }
                   labelPosition='right'
                   placeholder='(e.g. 4)'
                   value={ this.state.fontSize } />

            <Header><Icon name='align justify' /> Line Height</Header>
            <Input label={ { basic: true, content: 'em' } }
                   labelPosition='right'
                   placeholder='(e.g. 1.5)' />

            <Header><Icon name='file alternate outline' /> Margins</Header>
            <Input label={ { basic: true, content: 'em' } }
                   labelPosition='right'
                   placeholder='(e.g. 2)' />

            <Header><Icon name='closed captioning outline' /> Capitalization</Header>
            <Checkbox label='ALL CAPS' />

            <Header><Icon name='paint brush' /> Colors</Header>
            <Grid divided='vertically'>
              <Grid.Row columns={ 2 }>
                <Grid.Column>
                  <p>Font color</p>
                  <ChromePicker />
                </Grid.Column>
                <Grid.Column>
                  <p>Background color</p>
                  <ChromePicker />
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button primary>
            Proceed <Icon name='chevron right' />
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

export default LiveTranscriptOptions;