import React from 'react';
import robot from './images/robot.png';
import '../Character.scss';
import './Monster.scss';

function Monster() {
  return (
    <img src={robot} alt="Monster" className="character monster" />
  );
}

export default Monster;
