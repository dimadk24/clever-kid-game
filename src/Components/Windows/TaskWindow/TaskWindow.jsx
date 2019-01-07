import PropTypes from 'prop-types';
import React, { Component } from 'react';
import '../../../assets/fonts/fontello/css/fontello.css';
import Button from '../../Helpers/Button/Button';
import mapTaskToQuestion from '../../Questions/mapper';
import '../../utils.scss';
import { generateTask, validateSolution } from './logic';
import './TaskWindow.scss';

const INITIAL_WINDOW_CLASS_NAME = 'task__window horizontal-center';
const NOT_ANSWERED = 'not answered';
const SUCCESS = 'success';
const FAIL = 'fail';
const TIME_BEFORE_CLOSE = 1000;
const ESCAPE = 'Escape';

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
    this.task = generateTask();
    this.keyDownCallback = e => this.onKeyDown(e);
  }

  componentDidMount() {
    document.addEventListener('keydown', this.keyDownCallback);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.keyDownCallback);
  }

  onKeyDown({ code }) {
    if (code === ESCAPE) this.onClose();
  }

  respond(solution) {
    if (!solution) return;
    const right = validateSolution(this.task, solution);
    if (right) {
      this.setState({ answerType: SUCCESS });
      setTimeout(this.onSuccess, TIME_BEFORE_CLOSE);
    } else {
      this.setState({ answerType: FAIL });
      setTimeout(this.onFail, TIME_BEFORE_CLOSE);
    }
  }

  render() {
    const { answerType } = this.state;
    const answered = answerType !== NOT_ANSWERED;
    const windowClassName = generateWindowClassName(answerType);
    return (
      <div className={windowClassName}>
        <Button onClick={this.onClose} className="task__window__close">
          <i className="icon-close" />
        </Button>
        {
          mapTaskToQuestion(this.task, {
            onSubmit: solution => this.respond(solution),
            answered,
          })
        }
      </div>
    );
  }
}

TaskWindow.propTypes = {
  onSuccess: PropTypes.func.isRequired,
  onFail: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default TaskWindow;
export {
  validateSolution,
  generateWindowClassName,
  NOT_ANSWERED,
  SUCCESS,
  FAIL,
  INITIAL_WINDOW_CLASS_NAME,
};
