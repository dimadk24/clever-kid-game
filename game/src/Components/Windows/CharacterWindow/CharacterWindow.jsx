import PropTypes from 'prop-types';
import React from 'react';
import './CharacterWindow.scss';
import HealthBar from './HealthBar/HealthBar';

const RIGHT = 'right';
const LEFT = 'left';
const wrapperOffset = '3%';

function positionIsValid(position) {
  return [RIGHT, LEFT].includes(position);
}

function CharacterWindow({ name, health, position }) {
  if (!positionIsValid(position)) {
    throw new Error('position is invalid. Use either "right" or "left"');
  }
  const wrapperStyle = {
    [position]: wrapperOffset,
  };
  return (
    <div className="character__window" style={wrapperStyle}>
      <p className="character__name">{name}</p>
      <HealthBar number={health} />
    </div>
  );
}

CharacterWindow.propTypes = {
  name: PropTypes.string.isRequired,
  health: PropTypes.number.isRequired,
  position: PropTypes.string.isRequired,
};

export default CharacterWindow;
export {
  RIGHT, LEFT,
};
