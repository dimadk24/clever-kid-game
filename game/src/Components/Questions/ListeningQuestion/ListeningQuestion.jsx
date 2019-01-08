import 'core-js/modules/es6.array.iterator';
import 'core-js/modules/es6.promise';
import { Howl } from 'howler';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import words from '../../../../tasks_configs/listening/words';
import Button from '../../Helpers/Button/Button';
import Loader from '../../Helpers/Loader/Loader';
import { getRandom } from '../../Helpers/utils';
import QuestionWithTextAnswer from '../BaseQuestions/QuestionWithTextAnswer/QuestionWithTextAnswer';
import { addQuestion } from '../questionTypes';

function generate() {
  const random = getRandom(0, words.length);
  return {
    type: 'listening',
    name: words[random],
    solution: words[random],
  };
}

class ListeningQuestion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sound: null,
      loaded: false,
    };
    this.keyDownCallback = e => this.onKeyDown(e);
  }

  async componentDidMount() {
    const { name } = this.props;
    const { default: soundSrc } = await import(`./media/${name}.mp3`);
    const sound = new Howl({
      src: soundSrc,
      onload: () => this.setState({ loaded: true }),
    });
    this.setState({ sound });
    document.addEventListener('keydown', this.keyDownCallback);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.keyDownCallback);
  }

  onKeyDown({ code }) {
    const { sound, loaded } = this.state;
    if (code === 'Space' && loaded) {
      sound.play();
    }
  }

  render() {
    const { sound, loaded } = this.state;
    let question;
    if (loaded) {
      question = (
        <Button onClick={() => sound.play()} className="question__button">
          Play
        </Button>
      );
    } else question = <Loader size="s" />;
    const hint = 'Write a word, that is being pronounced:';
    const { ...baseComponentProps } = this.props;
    return (
      <QuestionWithTextAnswer hint={hint} question={question} {...baseComponentProps} />
    );
  }
}

ListeningQuestion.propTypes = {
  name: PropTypes.string.isRequired,
};

addQuestion('listening', { render: ListeningQuestion, generate });
export default generate;
