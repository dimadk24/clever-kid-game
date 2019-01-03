import React from 'react';
import MathQuestion from './MathQuestion/MathQuestion';

function mapTaskToQuestion(task) {
  switch (task.type) {
    case 'math':
      return <MathQuestion sign={task.math.sign} operands={task.math.operands} />;
    default:
      throw new Error(`Wrong task type: ${task.type}`);
  }
}

export default mapTaskToQuestion;
