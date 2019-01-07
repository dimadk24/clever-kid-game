import React from 'react';
import PropTypes from 'prop-types';
import QuestionWithButtons from '../BaseQuestions/QuestionWithButtons/QuestionWithButtons';

const answers = [
  {
    content: '<',
    shortcutCode: 'ArrowLeft',
    value: '<',
  },
  {
    content: '=',
    shortcutCode: 'ArrowUp',
    value: '=',
  },
  {
    content: '>',
    shortcutCode: 'ArrowRight',
    value: '>',
  },
];

function GreaterLessOrEqualQuestion({ operands, ...baseComponentProps }) {
  const question = `${operands[0]} ? ${operands[1]}`;
  return (
    <QuestionWithButtons question={question} answers={answers} {...baseComponentProps} />
  );
}

GreaterLessOrEqualQuestion.propTypes = {
  operands: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default GreaterLessOrEqualQuestion;
