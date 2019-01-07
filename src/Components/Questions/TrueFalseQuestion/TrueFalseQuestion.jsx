import React from 'react';
import PropTypes from 'prop-types';
import QuestionWithButtons from '../BaseQuestions/QuestionWithButtons/QuestionWithButtons';

const answers = [
  {
    content: 'True',
    shortcutCode: 'KeyT',
    value: 'true',
  },
  {
    content: 'False',
    shortcutCode: 'KeyF',
    value: 'false',
  },
];

function TrueFalseQuestion({ question, ...baseComponentProps }) {
  return (
    <QuestionWithButtons
      question={question}
      answers={answers}
      {...baseComponentProps}
    />
  );
}

TrueFalseQuestion.propTypes = {
  question: PropTypes.string.isRequired,
};

export default TrueFalseQuestion;
