import dictionary from '../../../../tasks_configs/translate/dictionary';
import words from '../../../../tasks_configs/listening/words';
import { getRandom } from '../../Helpers/utils';

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

function generateListeningTask() {
  const random = getRandom(0, words.length);
  return {
    type: 'listening',
    listening: {
      name: words[random],
      solution: words[random],
    },
  };
}

function generateTranslateTask() {
  const randomInt = getRandom(0, dictionary.length);
  const item = dictionary[randomInt];
  return {
    type: 'translate',
    translate: {
      word: item.word,
      solutions: item.translations,
    },
  };
}

function generateTask() {
  const random = getRandom(0, 3);
  switch (random) {
    case 0:
      return generateMathTask();
    case 1:
      return generateListeningTask();
    case 2:
      return generateTranslateTask();
    default:
      throw new Error(`Bad random: ${random}. Expected it to be >=0 and < 2`);
  }
}

function validateSolution(task, solution) {
  const { type } = task;
  switch (type) {
    case 'math':
      return task.math.solution === parseInt(solution, 10);
    case 'listening':
      return task.listening.solution === solution;
    case 'translate':
      return task.translate.solutions.includes(solution);
    default:
      throw new Error(`validating solutions for this type of task (${type}) is not implemented yet`);
  }
}

export {
  generateMathTask,
  generateListeningTask,
  generateTranslateTask,
  calculateSolution,
  validateSolution,
  generateTask,
};
