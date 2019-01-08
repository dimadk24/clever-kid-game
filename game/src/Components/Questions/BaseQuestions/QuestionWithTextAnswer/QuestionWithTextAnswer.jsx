import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Button from '../../../Helpers/Button/Button';
import './TextQuestion.scss';

class QuestionWithTextAnswer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userSolution: '',
    };
  }

  onInputChange(e) {
    const { spaceAllowed } = this.props;
    const inputValue = e.target.value;
    let userSolution;
    if (spaceAllowed) userSolution = inputValue;
    else userSolution = inputValue.trim();
    this.setState({ userSolution });
  }

  onFormSubmit(e) {
    e.preventDefault();
    const { onSubmit } = this.props;
    const input = document.querySelector('.text-question > input.text-question__input');
    onSubmit(input.value);
  }

  render() {
    const {
      hint,
      question,
      answered,
    } = this.props;
    const { userSolution } = this.state;
    return (
      <form onSubmit={e => this.onFormSubmit(e)}>
        <div className="text-question">
          <p>{hint}</p>
          <div className="text-question__content">{question}</div>
          <input
            className="text-question__input"
            autoFocus
            disabled={answered}
            onChange={e => this.onInputChange(e)}
            value={userSolution}
          />
        </div>
        <Button type="submit" className="button text-question__send">
          Send
        </Button>
      </form>
    );
  }
}

QuestionWithTextAnswer.propTypes = {
  hint: PropTypes.string.isRequired,
  question: PropTypes.node.isRequired,
  onSubmit: PropTypes.func.isRequired,
  answered: PropTypes.bool.isRequired,
  spaceAllowed: PropTypes.bool,
};

QuestionWithTextAnswer.defaultProps = {
  spaceAllowed: false,
};

export default QuestionWithTextAnswer;
