import React from 'react';
import PropTypes from 'prop-types';
import QuestionWithTextAnswer from '../BaseQuestions/QuestionWithTextAnswer/QuestionWithTextAnswer';


function CountryQuestion({ capital, ...baseComponentProps }) {
  const hint = 'Which country\'s capital is this city:';
  return (
    <QuestionWithTextAnswer hint={hint} question={capital} {...baseComponentProps} />
  );
}

CountryQuestion.propTypes = {
  capital: PropTypes.string.isRequired,
};

export default CountryQuestion;
