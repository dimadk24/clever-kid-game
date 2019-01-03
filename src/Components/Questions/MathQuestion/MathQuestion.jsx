import PropTypes from 'prop-types';
import React from 'react';


function MathQuestion({ operands, sign }) {
  return (
    <span>
      {operands[0]}
      {sign}
      {operands[1]}
      =
    </span>
  );
}

MathQuestion.propTypes = {
  operands: PropTypes.arrayOf(PropTypes.number).isRequired,
  sign: PropTypes.string.isRequired,
};

export default MathQuestion;
