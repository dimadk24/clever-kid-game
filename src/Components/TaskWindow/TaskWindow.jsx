import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../../assets/fonts/fontello/css/fontello.css';
import './TaskWindow.scss';
import '../utils.scss';
import Button from '../Helpers/Button/Button';

const INITIAL_WINDOW_CLASS_NAME = 'task__window horizontal-center';
const NOT_ANSWERED = 'not answered';
const SUCCESS = 'success';
const FAIL = 'fail';
const TIME_BEFORE_CLOSE = 1000;

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

function generateWindowClassName(answerType) {
  if (![SUCCESS, FAIL, NOT_ANSWERED].includes(answerType)) {
    throw new Error(`wrong answerType: ${answerType}`);
  }
  if (answerType === NOT_ANSWERED) {
    return INITIAL_WINDOW_CLASS_NAME;
  }
  return `${INITIAL_WINDOW_CLASS_NAME} ${answerType}`;
}

class TaskWindow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userSolution: '',
      answerType: NOT_ANSWERED,
    };
    this.onFail = () => {
      props.onFail();
      props.onClose();
    };
    this.onSuccess = () => {
      props.onSuccess();
      props.onClose();
    };
    this.onClose = () => props.onClose();
  }

  onInputChange(e) {
    this.setState({ userSolution: parseInt(e.target.value, 10) });
  }

  respond(task, solution) {
    const { userSolution } = this.state;
    if (!userSolution) return;
    const right = validateSolution(task, solution);
    if (right) {
      this.setState({ answerType: SUCCESS });
      setTimeout(this.onSuccess, TIME_BEFORE_CLOSE);
    } else {
      this.setState({ answerType: FAIL });
      setTimeout(this.onFail, TIME_BEFORE_CLOSE);
    }
  }

  render() {
    const { task } = this.props;
    const { answerType, userSolution } = this.state;
    let question;
    if (task.type === 'math') {
      question = convertTaskToStringQuestion(task);
    }
    const answered = answerType !== NOT_ANSWERED;
    const windowClassName = generateWindowClassName(answerType);
    return (
      <div className={windowClassName}>
        <Button onClick={this.onClose} className="task__window__close">
          <i className="icon-close" />
        </Button>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            this.respond(task, userSolution);
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
              disabled={answered}
            />
          </div>
          <Button className="task__window__send" type="submit">
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
