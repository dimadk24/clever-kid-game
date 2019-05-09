import React from 'react';
import PropTypes from 'prop-types';
import dictionary from '../../../../tasks_configs/translate/engToRusDictionary';
import { getRandom } from '../../Helpers/utils';
import QuestionWithTextAnswer from '../BaseQuestions/QuestionWithTextAnswer/QuestionWithTextAnswer';
import { addQuestion } from '../questionTypes';

function generate() {
  const randomInt = getRandom(0, dictionary.length);
  const item = dictionary[randomInt];
  return {
    type: 'translateToRus',
    word: item.word,
    solutions: item.translations,
  };
}

function TranslateToRusQuestion({ word, ...baseComponentProps }) {
  const hint = 'Translate to Russian';
  return (
    <QuestionWithTextAnswer
      hint={hint}
      question={word}
      {...baseComponentProps}
    />
  );
}

TranslateToRusQuestion.propTypes = {
  word: PropTypes.string.isRequired,
};

addQuestion('translateToRus', { render: TranslateToRusQuestion, generate });
export default generate;
