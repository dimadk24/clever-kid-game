import React, { Component } from 'react';

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
      <div className="App">
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
