import React from 'react';
import PropTypes from 'prop-types';
import countries from '../../../../tasks_configs/capital/countries';
import { getRandom } from '../../Helpers/utils';
import QuestionWithTextAnswer from '../BaseQuestions/QuestionWithTextAnswer/QuestionWithTextAnswer';
import { addQuestion } from '../questionTypes';

function generate() {
  const random = getRandom(0, countries.length);
  const item = countries[random];
  return {
    type: 'capital',
    country: item.country,
    solution: item.capital,
  };
}

function CapitalQuestion({ country, ...baseComponentProps }) {
  const hint = 'What is the capital of this country:';
  return (
    <QuestionWithTextAnswer hint={hint} question={country} {...baseComponentProps} />
  );
}

CapitalQuestion.propTypes = {
  country: PropTypes.string.isRequired,
};

addQuestion('capital', { render: CapitalQuestion, generate });
export default generate;
