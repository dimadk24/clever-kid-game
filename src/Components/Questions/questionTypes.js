const questionTypes = new Map();

/*
question: {
  render: reactComponent,
  generate: function,
  validate: function.optional,
}
*/
function addQuestion(name, question) {
  if (questionTypes.has(name)) throw new Error(`question type with name ${name} already registered`);
  questionTypes.set(name, question);
}

function getSize() {
  return questionTypes.size;
}

function getQuestion(name) {
  return questionTypes.get(name);
}

function forEach(callback) {
  questionTypes.forEach(callback);
}

export {
  getQuestion,
  addQuestion,
  forEach,
  getSize,
};
