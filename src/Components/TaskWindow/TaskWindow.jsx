import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../../assets/fonts/fontello/css/fontello.css';
import './TaskWindow.scss';
import Button from '../Helpers/Button/Button';


function validateSolution(task, solution) {
  const { type } = task;
  if (type !== 'math') {
    throw new Error(`validating solutions for this type of task (${type}) is not implemented yet`);
  }
  return task.math.solution === solution;
}

function convertTaskToStringQuestion(task) {
  const { type } = task;
  if (type === 'math') {
    const { math } = task;
    const { operands } = math;
    return `${operands[0]}${math.sign}${operands[1]}`;
  }
  throw new Error(`Unknown task type: ${type}`);
}

class TaskWindow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userSolution: '',
    };
    this.onFail = () => props.onFail();
    this.onSuccess = () => props.onSuccess();
    this.onClose = () => props.onClose();
  }

  onInputChange(e) {
    this.setState({ userSolution: parseInt(e.target.value, 10) });
  }

  send(task, solution) {
    const right = validateSolution(task, solution);
    if (right) this.onSuccess();
    else this.onFail();
    this.onClose();
  }

  render() {
    const { task } = this.props;
    let question;
    if (task.type === 'math') {
      question = convertTaskToStringQuestion(task);
    }
    const { userSolution } = this.state;
    return (
      <div className="task__window">
        <Button onClick={this.onClose} className="task__window__close">
          <i className="icon-close" />
        </Button>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            this.send(task, userSolution);
          }}
        >
          <div className="task__window__question">
            <span>
              {question}
              =
            </span>
            <input
              className="task__window__input"
              type="text"
              onChange={e => this.onInputChange(e)}
            />
          </div>
          <Button
            className="task__window__send"
            type="submit"
          >
              Send
          </Button>
        </form>
      </div>
    );
  }
}

TaskWindow.propTypes = {
  onSuccess: PropTypes.func.isRequired,
  onFail: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  task: PropTypes.shape({
    type: PropTypes.oneOf(['math']).isRequired,
    math: PropTypes.shape({
      operands: PropTypes.array.isRequired,
      sign: PropTypes.string.isRequired,
      solution: PropTypes.number.isRequired,
    }),
  }).isRequired,
};

export default TaskWindow;
export { validateSolution, convertTaskToStringQuestion };
