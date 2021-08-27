function preValidate(task, userSolution) {
  const editableTask = { ...task };
  let editableUserSolution = userSolution;
  if (typeof editableUserSolution === 'string') {
    editableUserSolution = editableUserSolution.toLowerCase();
  }
  if (typeof editableTask.solution === 'string') {
    editableTask.solution = editableTask.solution.toLowerCase();
  } else if (Array.isArray(editableTask.solutions)) {
    if (editableTask.solutions.every(item => typeof item === 'string')) {
      editableTask.solutions = editableTask.solutions.map(item => item.toLowerCase());
    }
  }
  return [editableTask, editableUserSolution];
}

function defaultValidator(task, userSolution) {
  if (typeof task.solution === 'string' && typeof userSolution === 'string') {
    return task.solution === userSolution;
  }
  if (typeof task.solution === 'number') {
    return task.solution === parseInt(userSolution, 10);
  }
  if (Array.isArray(task.solutions)) {
    return task.solutions.includes(userSolution);
  }
  throw new Error('cannot validate task by default validator, please provide our own');
}

function validate(task, userSolution, validator) {
  let [editableTask, editableUserSolution] = [{ ...task }, userSolution];
  [editableTask, editableUserSolution] = preValidate(editableTask, editableUserSolution);
  if (typeof validator === 'function') return validator(editableTask, editableUserSolution);
  return defaultValidator(editableTask, editableUserSolution);
}

export default validate;
export { defaultValidator, preValidate };
