import React from 'react';
import PropTypes from 'prop-types';
import QuestionWithButtons from '../BaseQuestions/QuestionWithButtons/QuestionWithButtons';

function createShortcutCode(zeroBasedIndex) {
  const index = zeroBasedIndex + 1;
  if (index > 9) throw new Error(`Too many suggestions: ${index}. We can only have 9 at max`);
  return `Digit${index}`;
}


function MissedWordQuestion({ parts, suggestions, ...baseComponentProps }) {
  const question = `${parts[0]} ? ${parts[1]}`;
  const answers = suggestions.map((item, index) => ({
    content: item,
    shortcutCode: createShortcutCode(index),
    value: item,
  }));
  return (
    <QuestionWithButtons
      question={question}
      answers={answers}
      {...baseComponentProps}
    />
  );
}

MissedWordQuestion.propTypes = {
  parts: PropTypes.arrayOf(PropTypes.string).isRequired,
  suggestions: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default MissedWordQuestion;
export { createShortcutCode };
