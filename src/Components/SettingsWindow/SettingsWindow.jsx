import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../../assets/fonts/fontello/css/fontello.css';
import './SettingsWindow.scss';
import '../utils.scss';
import Button from '../Helpers/Button/Button';

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
  }

  onChangeSound() {
    this.setState((prevState) => {
      const newSoundState = !prevState.soundOn;
      const { onChangeSound: changeSoundCallback } = this.props;
      changeSoundCallback(newSoundState);
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
