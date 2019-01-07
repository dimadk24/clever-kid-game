import React from 'react';
import PropTypes from 'prop-types';
import QuestionWithTextAnswer from '../BaseQuestions/QuestionWithTextAnswer/QuestionWithTextAnswer';


function TranslateQuestion({ word, toLang, ...baseComponentProps }) {
  let hint = 'Translate to ';
  if (toLang === 'toRus') hint += 'Russian:';
  else if (toLang === 'toEng') hint += 'English:';
  return (
    <QuestionWithTextAnswer
      hint={hint}
      question={word}
      {...baseComponentProps}
    />
  );
}

TranslateQuestion.propTypes = {
  word: PropTypes.string.isRequired,
  toLang: PropTypes.oneOf(['toRus', 'toEng']).isRequired,
};

export default TranslateQuestion;
