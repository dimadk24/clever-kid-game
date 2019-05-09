import React from 'react';
import PropTypes from 'prop-types';
import { calculateMathSolution, getRandom, getRandomItemFromArray } from '../../Helpers/utils';
import QuestionWithButtons from '../BaseQuestions/QuestionWithButtons/QuestionWithButtons';
import { addQuestion } from '../questionTypes';


function generate() {
  const operands = [
    getRandom(10, 100),
    getRandom(10, 100),
  ];
  const sign = getRandomItemFromArray(['+', '-']);
  const equals = calculateMathSolution({ operands, sign });
  return {
    type: 'missedSign',
    operands,
    equals,
    solution: sign,
  };
}

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

addQuestion('missedSign', { render: MissedSignQuestion, generate });
export default generate;
