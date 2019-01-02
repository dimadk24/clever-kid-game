import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../../assets/fonts/fontello/css/fontello.css';
import './SettingsWindow.scss';
import '../utils.scss';
import Button from '../Helpers/Button/Button';

const sKeyCode = 83;

function createSoundIconClass(soundState) {
  if (soundState) return 'sound-on';
  return 'sound-off';
}

function shouldHandleKeyEvent(tagName) {
  const lowerCaseTagName = tagName.toLowerCase();
  return !(['input', 'select', 'textarea'].includes(lowerCaseTagName));
}

class SettingsWindow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      soundOn: true,
    };
    const { onChangeSound } = this.props;
    this.changeSoundCallback = () => onChangeSound();
  }

  componentDidMount() {
    document.addEventListener('keydown', e => this.onKeyDown(e));
  }

  onKeyDown({ keyCode, target }) {
    if (!shouldHandleKeyEvent(target.tagName)) return;
    if (keyCode === sKeyCode) this.onChangeSound();
  }

  onChangeSound() {
    this.setState((prevState) => {
      const newSoundState = !prevState.soundOn;
      this.changeSoundCallback(newSoundState);
      return { soundOn: newSoundState };
    });
  }

  render() {
    const { soundOn } = this.state;
    const soundIconClass = createSoundIconClass(soundOn);
    return (
      <div className="settings__window horizontal-center">
        <Button
          className="no-sound-wrapper"
          onClick={() => this.onChangeSound()}
        >
          <i className={`icon-${soundIconClass}`} />
        </Button>
      </div>
    );
  }
}

SettingsWindow.propTypes = {
  onChangeSound: PropTypes.func.isRequired,
};

export default SettingsWindow;
