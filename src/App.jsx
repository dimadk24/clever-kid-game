import React, { Component } from 'react';
import './App.scss';
import LoginWindow from './Components/Windows/LoginWindow/LoginWindow';
import ScoreWindow from './Components/Windows/ScoreWindow/ScoreWindow';
import Game from './Game';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      heroAlive: true,
      score: 0,
    };
  }

  onHeroDead(score) {
    this.setState({ heroAlive: false, score });
  }

  render() {
    const { username, heroAlive, score } = this.state;
    return (
      <div className="app">
        {
          !username && (
            <LoginWindow
              onLogIn={name => this.setState({ username: name })}
            />
          )
        }
        {
          username && heroAlive
          && <Game username={username} onDead={gameScore => this.onHeroDead(gameScore)} />
        }
        {
          !heroAlive && <ScoreWindow score={score} username={username} />
        }
      </div>
    );
  }
}

export default App;
