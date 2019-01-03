import { getRandom } from '../Helpers/utils';

function getRandomSign() {
  const random = getRandom(0, 2);
  switch (random) {
    case 0:
      return '-';
    case 1:
      return '+';
    default:
      throw new Error(`Bad random int: ${random}`);
  }
}

function calculateSolution({ operands, sign }) {
  switch (sign) {
    case '+':
      return operands[0] + operands[1];
    case '-':
      return operands[0] - operands[1];
    default:
      throw new Error(`Wrong sign: ${sign}`);
  }
}

function generateMathTask() {
  const operands = [
    getRandom(10, 100),
    getRandom(10, 100),
  ];
  const sign = getRandomSign();
  const solution = calculateSolution({ operands, sign });
  return {
    type: 'math',
    math: { operands, sign, solution },
  };
}

function validateSolution(task, solution) {
  const { type } = task;
  if (type !== 'math') {
    throw new Error(`validating solutions for this type of task (${type}) is not implemented yet`);
  }
  return task.math.solution === parseInt(solution, 10);
}

export {
  generateMathTask,
  calculateSolution,
  validateSolution,
};
