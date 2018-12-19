import React from 'react';
import idleHero from './images/idle.png';
import '../Character.scss';
import './Hero.scss';

function Hero() {
  return (
    <img src={idleHero} alt="Hero" className="character hero" />
  );
}

export default Hero;
