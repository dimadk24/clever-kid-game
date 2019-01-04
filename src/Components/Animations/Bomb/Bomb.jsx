import classNames from 'classnames';
import { Howl } from 'howler';
import PropTypes from 'prop-types';
import React from 'react';
import image from './assets/image.png';
import sound from './assets/sound effect.mp3';
import './Bomb.scss';

const ANIMATION_DURATION = 2300;

function Bomb({ position }) {
  const howlSound = new Howl({ src: sound });
  howlSound.play();
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
};

export default Bomb;
export { ANIMATION_DURATION };
