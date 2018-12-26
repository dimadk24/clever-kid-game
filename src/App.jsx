import React, { Component } from 'react';
import './App.scss';
import Game from './Game';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: true,
    };
  }

  render() {
    const { loggedIn } = this.state;
    return (
      <div className="app">
        {loggedIn && <Game username="DimaDK" />}
      </div>
    );
  }
}

export default App;
