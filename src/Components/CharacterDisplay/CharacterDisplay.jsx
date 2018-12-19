import PropTypes from 'prop-types';
import React from 'react';
import './CharacterDisplay.scss';
import CharacterHeath from './CharacterHealth/CharacterHeath';

const RIGHT = 'right';
const LEFT = 'left';
const wrapperOffset = '3%';

function positionIsValid(position) {
  return [RIGHT, LEFT].includes(position);
}

function CharacterDisplay({ name, health, position }) {
  if (!positionIsValid(position)) {
    throw new Error('position is invalid. Use either "right" or "left"');
  }
  const wrapperStyle = {
    [position]: wrapperOffset,
  };
  return (
    <div className="character__display" style={wrapperStyle}>
      <p className="character__name">{name}</p>
      <CharacterHeath number={health} />
    </div>
  );
}

CharacterDisplay.propTypes = {
  name: PropTypes.string.isRequired,
  health: PropTypes.number.isRequired,
  position: PropTypes.string.isRequired,
};

export default CharacterDisplay;
export {
  RIGHT, LEFT,
};
