import React, { Component } from 'react';
import './App.scss';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'world',
    };
  }

  render() {
    const { name } = this.state;
    return (
      <div className="app">
        <h2>
          Hello,
          {' '}
          {name}
          !
        </h2>
      </div>
    );
  }
}

export default App;
