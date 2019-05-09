import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '../../../Helpers/Button/Button';
import './QuestionWithButtons.scss';

class QuestionWithButtons extends Component {
  constructor(props) {
    super(props);
    this.keyDownCallback = e => this.onKeyDown(e);
  }

  componentDidMount() {
    document.addEventListener('keydown', this.keyDownCallback);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.keyDownCallback);
  }

  onKeyDown({ code }) {
    const { answers, onSubmit } = this.props;
    answers.forEach(
      answer => code === answer.shortcutCode && onSubmit(answer.value),
    );
  }

  render() {
    const {
      question,
      answers,
      answered,
      onSubmit,
    } = this.props;
    return (
      <form className="buttons-question">
        <p className="buttons-question__content">{question}</p>
        <div className="buttons-question__answers">
          {
            answers.map(({ content, value }) => (
              <Button
                key={value}
                disabled={answered}
                onClick={() => onSubmit(value)}
                className="button-question__button"
              >
                {content}
              </Button>
            ))
          }
        </div>
      </form>
    );
  }
}


QuestionWithButtons.propTypes = {
  question: PropTypes.node.isRequired,
  answers: PropTypes.arrayOf(PropTypes.shape({
    content: PropTypes.node.isRequired,
    shortcutCode: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  })).isRequired,
  onSubmit: PropTypes.func.isRequired,
  answered: PropTypes.bool.isRequired,
};

export default QuestionWithButtons;
