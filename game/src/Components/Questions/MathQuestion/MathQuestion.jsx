import PropTypes from 'prop-types';
import React from 'react';
import { calculateMathSolution, getRandom, getRandomItemFromArray } from '../../Helpers/utils';
import QuestionWithTextAnswer from '../BaseQuestions/QuestionWithTextAnswer/QuestionWithTextAnswer';
import { addQuestion } from '../questionTypes';

function generate() {
  const operands = [
    getRandom(10, 100),
    getRandom(10, 100),
  ];
  const sign = getRandomItemFromArray(['+', '-']);
  const solution = calculateMathSolution({ operands, sign });
  return {
    type: 'math',
    operands,
    sign,
    solution,
  };
}

function MathQuestion({ operands, sign, ...baseComponentProps }) {
  return (
    <QuestionWithTextAnswer
      hint="Calculate:"
      question={`${operands[0]}${sign}${operands[1]}=`}
      {...baseComponentProps}
    />
  );
}

MathQuestion.propTypes = {
  operands: PropTypes.arrayOf(PropTypes.number).isRequired,
  sign: PropTypes.string.isRequired,
};
addQuestion('math', { render: MathQuestion, generate });
export default generate;
