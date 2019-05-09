import React, { Component } from 'react';
import PropTypes from 'prop-types';
import logos from '../../../../tasks_configs/logo/logos';
import Loader from '../../Helpers/Loader/Loader';
import { getRandom } from '../../Helpers/utils';
import QuestionWithTextAnswer from '../BaseQuestions/QuestionWithTextAnswer/QuestionWithTextAnswer';
import { addQuestion } from '../questionTypes';

function generate() {
  const random = getRandom(0, logos.length);
  const item = logos[random];
  return {
    type: 'logo',
    name: item,
  };
}

function validate(task, userSolution) {
  return task.name === userSolution;
}

class LogoQuestion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageSource: null,
    };
  }

  async componentDidMount() {
    const { name } = this.props;
    const { default: imageSource } = await import(`./images/${name}.jpg`);
    this.setState({ imageSource });
  }

  render() {
    const { name, ...baseComponentProps } = this.props;
    const { imageSource } = this.state;
    let question;
    if (imageSource) {
      question = (<img src={imageSource} alt={name} height="120" />);
    } else question = <Loader />;
    return (
      <QuestionWithTextAnswer
        hint="Logo of which company is on the image:"
        question={question}
        {...baseComponentProps}
      />
    );
  }
}

LogoQuestion.propTypes = {
  name: PropTypes.string.isRequired,
};

addQuestion('logo', { render: LogoQuestion, generate, validate });
export { generate, validate };
