import React from 'react';
import PropTypes from 'prop-types';
import QuestionWithTextAnswer from '../BaseQuestions/QuestionWithTextAnswer/QuestionWithTextAnswer';


function NumberToStringQuestion({ number, ...baseComponentProps }) {
  const hint = 'Text the number below:';
  return (
    <QuestionWithTextAnswer
      hint={hint}
      question={number}
      spaceAllowed
      {...baseComponentProps}
    />
  );
}

NumberToStringQuestion.propTypes = {
  number: PropTypes.number.isRequired,
};

export default NumberToStringQuestion;
