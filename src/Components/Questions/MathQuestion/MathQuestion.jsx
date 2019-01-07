import PropTypes from 'prop-types';
import React from 'react';
import QuestionWithTextAnswer from '../BaseQuestions/QuestionWithTextAnswer/QuestionWithTextAnswer';


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

export default MathQuestion;
