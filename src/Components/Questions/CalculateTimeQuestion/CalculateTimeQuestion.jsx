import React from 'react';
import PropTypes from 'prop-types';
import QuestionWithTextAnswer from '../BaseQuestions/QuestionWithTextAnswer/QuestionWithTextAnswer';


function CalculateTimeQuestion({ hours, minutes, ...baseComponentProps }) {
  const hint = 'Calculate this time in minutes:';
  const question = `${hours} hours ${minutes} minutes`;
  return (
    <QuestionWithTextAnswer hint={hint} question={question} {...baseComponentProps} />
  );
}

CalculateTimeQuestion.propTypes = {
  hours: PropTypes.number.isRequired,
  minutes: PropTypes.number.isRequired,
};
export default CalculateTimeQuestion;
