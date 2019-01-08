import countries from '../../../../tasks_configs/capital/countries';
import images from '../../../../tasks_configs/image/images';
import words from '../../../../tasks_configs/listening/words';
import logos from '../../../../tasks_configs/logo/logos';
import missedWordDictionary from '../../../../tasks_configs/missed_word/dictionary';
import engToRusDictionary from '../../../../tasks_configs/translate/engToRusDictionary';
import rusToEngDictionary from '../../../../tasks_configs/translate/rusToEngDictionary';
import trueFalseQuestions from '../../../../tasks_configs/true_false/questions';
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

function generateTranslateTask(toLang) {
  let dictionary;
  if (toLang === 'toRus') dictionary = engToRusDictionary;
  else if (toLang === 'toEng') dictionary = rusToEngDictionary;
  else throw new Error(`wrong lang passed: ${toLang}. Expected one of: "toRus", "toEng"`);
  const randomInt = getRandom(0, dictionary.length);
  const item = dictionary[randomInt];
  return {
    type: 'translate',
    translate: {
      toLang,
      word: item.word,
      solutions: item.translations,
    },
  };
}

function generateImageTask() {
  const randomInt = getRandom(0, images.length);
  const item = images[randomInt];
  return {
    type: 'image',
    image: {
      name: item.name,
      solutions: item.solutions,
    },
  };
}

function generateLogoTask() {
  const random = getRandom(0, logos.length);
  const item = logos[random];
  return {
    type: 'logo',
    logo: {
      name: item,
    },
  };
}

function generateCapitalTask() {
  const random = getRandom(0, countries.length);
  const item = countries[random];
  return {
    type: 'capital',
    capital: {
      country: item.country,
      solution: item.capital,
    },
  };
}

function generateCountryTask() {
  const random = getRandom(0, countries.length);
  const item = countries[random];
  return {
    type: 'country',
    country: {
      capital: item.capital,
      solution: item.country,
    },
  };
}

function generateTrueFalseTask() {
  const random = getRandom(0, trueFalseQuestions.length);
  const item = trueFalseQuestions[random];
  return {
    type: 'trueFalse',
    trueFalse: {
      question: item.question,
      solution: String(item.right),
    },
  };
}

function getGreaterLessOrEqualSolution(left, right) {
  if (left < right) return '<';
  if (left > right) return '>';
  return '=';
}

function generateGreaterLessOrEqualTask() {
  const operands = [
    getRandom(10, 100),
    getRandom(10, 100),
  ];
  const solution = getGreaterLessOrEqualSolution(...operands);
  return {
    type: 'greaterLessOrEqual',
    greaterLessOrEqual: {
      operands,
      solution,
    },
  };
}

function generateMissedWordTask() {
  const random = getRandom(0, missedWordDictionary.length);
  const item = missedWordDictionary[random];
  return {
    type: 'missedWord',
    missedWord: {
      parts: item.parts,
      suggestions: item.suggestions,
      solution: item.solution,
    },
  };
}

function generateTask() {
  const taskTypesCount = 11;
  const random = getRandom(0, taskTypesCount);
  switch (random) {
    case 0:
      return generateMathTask();
    case 1:
      return generateListeningTask();
    case 2:
      return generateTranslateTask('toRus');
    case 3:
      return generateImageTask();
    case 4:
      return generateLogoTask();
    case 5:
      return generateCapitalTask();
    case 6:
      return generateCountryTask();
    case 7:
      return generateTranslateTask('toEng');
    case 8:
      return generateTrueFalseTask();
    case 9:
      return generateGreaterLessOrEqualTask();
    case 10:
      return generateMissedWordTask();
    default:
      throw new Error(`Bad random: ${random}. Expected it to be >=0 and < ${taskTypesCount}`);
  }
}

function validateSolution(task, rawSolution) {
  const solution = rawSolution.toLowerCase();
  const { type } = task;
  switch (type) {
    case 'math':
      return task.math.solution === parseInt(solution, 10);
    case 'listening':
      return task.listening.solution === solution;
    case 'translate':
      return task.translate.solutions.includes(solution);
    case 'image':
      return task.image.solutions.includes(solution);
    case 'logo':
      return task.logo.name === solution;
    case 'capital':
      return task.capital.solution.toLowerCase() === solution;
    case 'country':
      return task.country.solution.toLowerCase() === solution;
    case 'trueFalse':
      return task.trueFalse.solution === solution;
    case 'greaterLessOrEqual':
      return task.greaterLessOrEqual.solution === solution;
    case 'missedWord':
      return task.missedWord.solution === solution;
    default:
      throw new Error(`validating solutions for this type of task (${type}) is not implemented yet`);
  }
}

export {
  generateMathTask,
  generateListeningTask,
  generateTranslateTask,
  generateImageTask,
  generateLogoTask,
  generateCapitalTask,
  generateCountryTask,
  generateTrueFalseTask,
  generateGreaterLessOrEqualTask,
  getGreaterLessOrEqualSolution,
  generateMissedWordTask,
  calculateSolution,
  validateSolution,
  generateTask,
};
