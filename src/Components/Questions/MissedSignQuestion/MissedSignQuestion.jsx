import React from 'react';
import PropTypes from 'prop-types';
import QuestionWithButtons from '../BaseQuestions/QuestionWithButtons/QuestionWithButtons';

const answers = [
  {
    content: 'x',
    shortcutCode: 'KeyX',
    value: '*',
  },
  {
    content: '-',
    shortcutCode: 'KeyM',
    value: '-',
  },
  {
    content: '+',
    shortcutCode: 'KeyP',
    value: '+',
  },
];

function MissedSignQuestion({ operands, equals, ...baseComponentProps }) {
  const question = `${operands[0]} ? ${operands[1]} = ${equals}`;
  return (
    <QuestionWithButtons
      question={question}
      answers={answers}
      {...baseComponentProps}
    />
  );
}

MissedSignQuestion.propTypes = {
  operands: PropTypes.arrayOf(PropTypes.number).isRequired,
  equals: PropTypes.number.isRequired,
};

export default MissedSignQuestion;
