import React, { Component } from 'react';
import PropTypes from 'prop-types';
import images from '../../../../tasks_configs/image/images';
import Loader from '../../Helpers/Loader/Loader';
import { getRandom } from '../../Helpers/utils';
import QuestionWithTextAnswer from '../BaseQuestions/QuestionWithTextAnswer/QuestionWithTextAnswer';
import { addQuestion } from '../questionTypes';


function generate() {
  const randomInt = getRandom(0, images.length);
  const item = images[randomInt];
  return {
    type: 'image',
    name: item.name,
    solutions: item.solutions,
  };
}

class ImageQuestion extends Component {
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
        hint="What is on the image:"
        question={question}
        {...baseComponentProps}
      />
    );
  }
}

ImageQuestion.propTypes = {
  name: PropTypes.string.isRequired,
};

addQuestion('image', { render: ImageQuestion, generate });
export default generate;
