import React from 'react';
import ListeningQuestion from './ListeningQuestion/ListeningQuestion';
import MathQuestion from './MathQuestion/MathQuestion';
import TranslateQuestion from './TranslateQuestion/TranslateQuestion';

function mapTaskToQuestion(task, baseOptions) {
  const props = { ...baseOptions };
  switch (task.type) {
    case 'math':
      props.sign = task.math.sign;
      props.operands = task.math.operands;
      return <MathQuestion {...props} />;
    case 'listening':
      props.name = task.listening.name;
      return <ListeningQuestion {...props} />;
    case 'translate':
      props.word = task.translate.word;
      return <TranslateQuestion {...props} />;
    default:
      throw new Error(`Wrong task type: ${task.type}`);
  }
}

export default mapTaskToQuestion;
