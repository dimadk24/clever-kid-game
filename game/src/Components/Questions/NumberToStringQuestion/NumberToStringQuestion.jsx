import numbered from 'numbered';
import React from 'react';
import PropTypes from 'prop-types';
import { getRandom } from '../../Helpers/utils';
import QuestionWithTextAnswer from '../BaseQuestions/QuestionWithTextAnswer/QuestionWithTextAnswer';
import { addQuestion } from '../questionTypes';

function generate() {
  const number = getRandom(10, 100);
  return {
    type: 'numberToString',
    number,
  };
}

function validate(task, userSolution) {
  return task.number === numbered.parse(userSolution);
}

function NumberToStringQuestion({ number, ...baseComponentProps }) {
  const hint = 'Text the number below:';
  return (
    <QuestionWithTextAnswer
      hint={hint}
      question={number}
      spaceAllowed
      {...baseComponentProps}
    />
  );
}

NumberToStringQuestion.propTypes = {
  number: PropTypes.number.isRequired,
};

addQuestion('numberToString', { render: NumberToStringQuestion, generate, validate });
export { generate, validate };
