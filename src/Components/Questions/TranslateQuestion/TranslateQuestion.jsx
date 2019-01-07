import React from 'react';
import PropTypes from 'prop-types';
import QuestionWithTextAnswer from '../BaseQuestions/QuestionWithTextAnswer/QuestionWithTextAnswer';


function TranslateQuestion({ word, ...baseComponentProps }) {
  return (
    <QuestionWithTextAnswer
      hint="Translate to Russian:"
      question={word}
      {...baseComponentProps}
    />
  );
}

TranslateQuestion.propTypes = {
  word: PropTypes.string.isRequired,
};

export default TranslateQuestion;
