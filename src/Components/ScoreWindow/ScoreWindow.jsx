import PropTypes from 'prop-types';
import React, { Component } from 'react';
import '../utils.scss';
import Loader from '../Helpers/Loader/Loader';
import {
  getScores,
  saveUserScore,
  sortScores,
  updateLocalScore,
} from './logic';
import ScoreItem from './ScoreItem/ScoreItem';
import './ScoreWindow.scss';

class ScoreWindow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scores: [],
    };
  }

  async componentDidMount() {
    const { username, score } = this.props;
    let scores = await getScores();
    scores = updateLocalScore(scores, { id: username, name: username, score });
    scores = sortScores(scores);
    this.setState({ scores });
    await saveUserScore(username, score);
  }

  render() {
    const { scores } = this.state;
    return (
      <div className="score-window horizontal-center">
        <h3 className="score-window__name">ScoreBoard</h3>
        <p className="score-window__header">
          <span>Username</span>
          <span>Score</span>
        </p>
        {
          scores.map(
            item => (
              <ScoreItem key={item.id} name={item.name} score={item.score} />
            ),
          )
        }
        {scores.length === 0 && <Loader />}
      </div>
    );
  }
}

ScoreWindow.propTypes = {
  username: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

export default ScoreWindow;
