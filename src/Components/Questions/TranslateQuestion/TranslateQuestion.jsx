import React from 'react';
import PropTypes from 'prop-types';
import './TranslateQuestion.scss';


function TranslateQuestion({ word }) {
  return (
    <div className="question">
      <p>Translate to Russian:</p>
      <p className="question__word">{word}</p>
    </div>
  );
}

TranslateQuestion.propTypes = {
  word: PropTypes.string.isRequired,
};

export default TranslateQuestion;
