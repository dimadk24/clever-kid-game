import React from 'react';
import PropTypes from 'prop-types';
import { getRandom } from '../../Helpers/utils';
import QuestionWithButtons from '../BaseQuestions/QuestionWithButtons/QuestionWithButtons';
import { addQuestion } from '../questionTypes';

function getSolution(left, right) {
  if (left < right) return '<';
  if (left > right) return '>';
  return '=';
}

function generate() {
  const operands = [
    getRandom(10, 100),
    getRandom(10, 100),
  ];
  const solution = getSolution(...operands);
  return {
    type: 'greaterLessOrEqual',
    operands,
    solution,
  };
}

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

addQuestion('greaterLessOrEqual', { render: GreaterLessOrEqualQuestion, generate });
export { generate, getSolution };
