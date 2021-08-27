import monsterNameParts from '../../../monsterNameParts';

function sleep(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}

function shouldHandleShortcutEvent(tagName) {
  const lowerCaseTagName = tagName.toLowerCase();
  return !(['input', 'select', 'textarea'].includes(lowerCaseTagName));
}

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function getRandomItemFromArray(array) {
  return array[getRandom(0, array.length)];
}

function generateMonsterNamePart(name) {
  const part = monsterNameParts[name];
  const random = getRandom(0, part.length);
  return part[random];
}

function generateMonsterName() {
  const namesOfNamesParts = ['adjectives', 'nouns', 'names'];
  let name = '';
  namesOfNamesParts.forEach((item) => {
    name += `${generateMonsterNamePart(item)} `;
  });
  return name.slice(0, -1);
}

function calculateMathSolution({ operands, sign }) {
  switch (sign) {
    case '+':
      return operands[0] + operands[1];
    case '-':
      return operands[0] - operands[1];
    default:
      throw new Error(`Wrong sign: ${sign}`);
  }
}


export {
  sleep,
  shouldHandleShortcutEvent,
  getRandom,
  getRandomItemFromArray,
  generateMonsterName,
  calculateMathSolution,
};
