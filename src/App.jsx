import React, { Component } from 'react';
import './App.scss';
import LoginWindow from './Components/LoginWindow/LoginWindow';
import Game from './Game';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
    };
  }

  render() {
    const { username } = this.state;
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
          username && <Game username={username} />
        }
      </div>
    );
  }
}

export default App;
