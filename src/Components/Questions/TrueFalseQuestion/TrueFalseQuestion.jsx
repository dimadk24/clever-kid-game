import React from 'react';
import PropTypes from 'prop-types';
import trueFalseQuestions from '../../../../tasks_configs/true_false/questions';
import { getRandom } from '../../Helpers/utils';
import QuestionWithButtons from '../BaseQuestions/QuestionWithButtons/QuestionWithButtons';
import { addQuestion } from '../questionTypes';

function generate() {
  const random = getRandom(0, trueFalseQuestions.length);
  const item = trueFalseQuestions[random];
  return {
    type: 'trueFalse',
    question: item.question,
    solution: String(item.right),
  };
}

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

addQuestion('trueFalse', { render: TrueFalseQuestion, generate });
export default generate;
