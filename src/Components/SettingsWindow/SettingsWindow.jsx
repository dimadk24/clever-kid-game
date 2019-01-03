import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../../assets/fonts/fontello/css/fontello.css';
import './SettingsWindow.scss';
import '../utils.scss';
import Button from '../Helpers/Button/Button';
import { shouldHandleShortcutEvent } from '../Helpers/utils';

const keyS = 'KeyS';

function createSoundIconClass(soundState) {
  if (soundState) return 'sound-on';
  return 'sound-off';
}

class SettingsWindow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      soundOn: true,
    };
    const { onChangeSound } = this.props;
    this.changeSoundCallback = (...args) => onChangeSound(...args);
    this.keyDownCallback = e => this.onKeyDown(e);
  }

  componentDidMount() {
    document.addEventListener('keydown', this.keyDownCallback);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.keyDownCallback);
  }

  onKeyDown({ code, target }) {
    if (!shouldHandleShortcutEvent(target.tagName)) return;
    if (code === keyS) this.onChangeSound();
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
