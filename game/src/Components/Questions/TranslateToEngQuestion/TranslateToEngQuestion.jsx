import React from 'react';
import PropTypes from 'prop-types';
import dictionary from '../../../../tasks_configs/translate/rusToEngDictionary';
import { getRandom } from '../../Helpers/utils';
import QuestionWithTextAnswer from '../BaseQuestions/QuestionWithTextAnswer/QuestionWithTextAnswer';
import { addQuestion } from '../questionTypes';

function generate() {
  const randomInt = getRandom(0, dictionary.length);
  const item = dictionary[randomInt];
  return {
    type: 'translateToEng',
    word: item.word,
    solutions: item.translations,
  };
}

function TranslateToEngQuestion({ word, ...baseComponentProps }) {
  const hint = 'Translate to English';
  return (
    <QuestionWithTextAnswer
      hint={hint}
      question={word}
      {...baseComponentProps}
    />
  );
}

TranslateToEngQuestion.propTypes = {
  word: PropTypes.string.isRequired,
};

addQuestion('translateToEng', { render: TranslateToEngQuestion, generate });
export default generate;
