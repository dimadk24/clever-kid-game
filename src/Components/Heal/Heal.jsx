import { Howl } from 'howler';
import React from 'react';
import sound from './assets/sound effect.mp3';
import './Heal.scss';

const ANIMATION_TIME = 1000;

function Heal() {
  const howlSound = new Howl({ src: sound });
  howlSound.play();
  return (
    <div className="heal" style={{ animationDuration: `${ANIMATION_TIME}ms` }} />
  );
}

export default Heal;
export { ANIMATION_TIME };
