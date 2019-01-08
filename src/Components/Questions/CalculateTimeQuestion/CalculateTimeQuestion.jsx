import React from 'react';
import PropTypes from 'prop-types';
import { getRandom } from '../../Helpers/utils';
import QuestionWithTextAnswer from '../BaseQuestions/QuestionWithTextAnswer/QuestionWithTextAnswer';
import { addQuestion } from '../questionTypes';


function generate() {
  const hours = getRandom(3, 10);
  const minutes = getRandom(10, 60);
  return {
    type: 'calculateTime',
    hours,
    minutes,
    solution: hours * 60 + minutes,
  };
}

function validate(task, userSolution) {
  return task.solution === parseInt(userSolution, 10);
}

function CalculateTimeQuestion({ hours, minutes, ...baseComponentProps }) {
  const hint = 'Calculate this time in minutes:';
  const question = `${hours} hours ${minutes} minutes`;
  return (
    <QuestionWithTextAnswer hint={hint} question={question} {...baseComponentProps} />
  );
}

CalculateTimeQuestion.propTypes = {
  hours: PropTypes.number.isRequired,
  minutes: PropTypes.number.isRequired,
};

addQuestion('calculateTime', { render: CalculateTimeQuestion, generate, validate });
export { generate, validate };
