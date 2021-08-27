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
    type: 'country',
    capital: item.capital,
    solution: item.country,
  };
}

function CountryQuestion({ capital, ...baseComponentProps }) {
  const hint = 'Which country\'s capital is this city:';
  return (
    <QuestionWithTextAnswer hint={hint} question={capital} {...baseComponentProps} />
  );
}

CountryQuestion.propTypes = {
  capital: PropTypes.string.isRequired,
};

addQuestion('country', { render: CountryQuestion, generate });
export default generate;
