import PropTypes from 'prop-types';
import React, { Component } from 'react';
import '../../../assets/fonts/fontello/css/fontello.css';
import Button from '../../Helpers/Button/Button';
import '../../utils.scss';
import { getQuestion } from '../../Questions/questionTypes';
import validate from '../../Questions/validate';
import './TaskWindow.scss';
import '../../Questions/registrator';

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
    const { taskName } = props;
    const question = getQuestion(taskName);
    const task = question.generate();
    this.state = {
      answerType: NOT_ANSWERED,
      task,
      question,
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
    const { question, task } = this.state;
    const right = validate(task, solution, question.validate);
    if (right) {
      this.setState({ answerType: SUCCESS });
      setTimeout(this.onSuccess, TIME_BEFORE_CLOSE);
    } else {
      this.setState({ answerType: FAIL });
      setTimeout(this.onFail, TIME_BEFORE_CLOSE);
    }
  }

  render() {
    const { answerType, question, task } = this.state;
    const answered = answerType !== NOT_ANSWERED;
    const windowClassName = generateWindowClassName(answerType);
    return (
      <div className={windowClassName}>
        <Button onClick={this.onClose} className="task__window__close">
          <i className="icon-close" />
        </Button>
        {
          React.createElement(question.render, {
            ...task,
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
  taskName: PropTypes.string.isRequired,
};

export default TaskWindow;
export {
  generateWindowClassName,
  NOT_ANSWERED,
  SUCCESS,
  FAIL,
  INITIAL_WINDOW_CLASS_NAME,
};
