import classNames from 'classnames';
import { Howl } from 'howler';
import PropTypes from 'prop-types';
import React from 'react';
import image from './assets/image.png';
import sound from './assets/sound effect.mp3';
import './Bomb.scss';

const ANIMATION_DURATION = 2300;

function playSound() {
  const howlSound = new Howl({ src: sound });
  howlSound.play();
}

function Bomb({ position, sounds }) {
  if (sounds) playSound();
  const classes = classNames('bomb', position);
  return (
    <img
      src={image}
      alt="bomb"
      className={classes}
      style={{ animationDuration: `${ANIMATION_DURATION}ms` }}
    />
  );
}

Bomb.propTypes = {
  position: PropTypes.oneOf(['left', 'right']).isRequired,
  sounds: PropTypes.bool.isRequired,
};

export default Bomb;
export { ANIMATION_DURATION };
