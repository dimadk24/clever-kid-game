import React from 'react';
import PropTypes from 'prop-types';
import './MonsterCounterWindow.scss';
import '../utils.scss';
import monsterHead from './images/monster-dead-head.png';

function MonsterCounterWindow({ number }) {
  return (
    <div className="monster-counter horizontal-center">
      <span className="monster-counter__number">{number}</span>
      <span className="monster-counter__x">X</span>
      <img src={monsterHead} className="monster-counter__monster-image" alt="Monster head" />
    </div>
  );
}

MonsterCounterWindow.propTypes = {
  number: PropTypes.number.isRequired,
};

export default MonsterCounterWindow;
