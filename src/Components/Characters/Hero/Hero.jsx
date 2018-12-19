import React from 'react';
import idleHero from './images/idle.png';
import './Hero.scss';

function Hero() {
  return (
    <img src={idleHero} alt="Hero" className="hero" />
  );
}

export default Hero;
