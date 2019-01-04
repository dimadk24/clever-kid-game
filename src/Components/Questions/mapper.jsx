import React from 'react';
import ListeningQuestion from './ListeningQuestion/ListeningQuestion';
import MathQuestion from './MathQuestion/MathQuestion';
import TranslateQuestion from './TranslateQuestion/TranslateQuestion';

function mapTaskToQuestion(task) {
  switch (task.type) {
    case 'math':
      return <MathQuestion sign={task.math.sign} operands={task.math.operands} />;
    case 'listening':
      return <ListeningQuestion name={task.listening.name} />;
    case 'translate':
      return <TranslateQuestion word={task.translate.word} />;
    default:
      throw new Error(`Wrong task type: ${task.type}`);
  }
}

export default mapTaskToQuestion;
