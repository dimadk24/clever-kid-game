import React from 'react';
import PropTypes from 'prop-types';
import QuestionWithTextAnswer from '../BaseQuestions/QuestionWithTextAnswer/QuestionWithTextAnswer';


function CapitalQuestion({ country, ...baseComponentProps }) {
  const hint = 'What is the capital of this country:';
  return (
    <QuestionWithTextAnswer hint={hint} question={country} {...baseComponentProps} />
  );
}

CapitalQuestion.propTypes = {
  country: PropTypes.string.isRequired,
};

export default CapitalQuestion;
