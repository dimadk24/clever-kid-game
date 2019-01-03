import 'core-js/modules/es6.array.iterator';
import 'core-js/modules/es6.promise';
import { Howl } from 'howler';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Button from '../../Helpers/Button/Button';
import Loader from '../../Helpers/Loader/Loader';
import './ListeningQuestion.scss';

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
    if (code === 'Space') {
      const { sound } = this.state;
      sound.play();
    }
  }

  render() {
    const { sound, loaded } = this.state;
    return (
      <div className="question">
        <p className="question__hint">Write a word, that is being pronounced:</p>
        {
          loaded && (
            <Button
              onClick={() => sound.play()}
              className="question__button"
            >
              Play
            </Button>
          )
        }
        {
          !loaded && <Loader />
        }
      </div>
    );
  }
}

ListeningQuestion.propTypes = {
  name: PropTypes.string.isRequired,
};

export default ListeningQuestion;
