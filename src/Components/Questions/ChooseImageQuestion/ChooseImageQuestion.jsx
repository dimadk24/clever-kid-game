import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loader from '../../Helpers/Loader/Loader';
import QuestionWithButtons from '../BaseQuestions/QuestionWithButtons/QuestionWithButtons';

function createShortcutCode(zeroBasedIndex) {
  const index = zeroBasedIndex + 1;
  if (index > 9) throw new Error(`Too many suggestions: ${index}. We can only have 9 at max`);
  return `Digit${index}`;
}

class ChooseImageQuestion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
    };
  }

  async componentDidMount() {
    const { suggestions } = this.props;
    const imagesPromises = suggestions.map(item => import(`./images/${item}.jpg`));
    const images = (await Promise.all(imagesPromises)).map(item => item.default);
    this.setState({ images });
  }


  render() {
    const { suggestions, object, ...baseComponentProps } = this.props;
    const { images } = this.state;
    if (images.length !== suggestions.length) return <Loader />;
    const answers = images.map((item, index) => ({
      content: <img src={item} alt={suggestions[index]} width="80" />,
      shortcutCode: createShortcutCode(index),
      value: suggestions[index],
    }));
    return (
      <QuestionWithButtons question={object} answers={answers} {...baseComponentProps} />
    );
  }
}

ChooseImageQuestion.propTypes = {
  object: PropTypes.string.isRequired,
  suggestions: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ChooseImageQuestion;
