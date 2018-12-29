import React from 'react';
import PropTypes from 'prop-types';
import './ScoreItem.scss';

function ScoreItem({ name, score }) {
  return (
    <p className="score-item">
      <span className="score-item__name">{name}</span>
      <span className="score-item__score">{score}</span>
    </p>
  );
}

ScoreItem.propTypes = {
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

export default ScoreItem;
