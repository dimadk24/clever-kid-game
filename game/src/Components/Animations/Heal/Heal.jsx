import { Howl } from 'howler';
import PropTypes from 'prop-types';
import React from 'react';
import sound from './assets/sound effect.mp3';
import './Heal.scss';

const ANIMATION_TIME = 1000;

function playSound() {
  const howlSound = new Howl({ src: sound });
  howlSound.play();
}

function Heal({ sounds }) {
  if (sounds) playSound();
  return (
    <div className="heal" style={{ animationDuration: `${ANIMATION_TIME}ms` }} />
  );
}


Heal.propTypes = {
  sounds: PropTypes.bool.isRequired,
};

export default Heal;
export { ANIMATION_TIME };
