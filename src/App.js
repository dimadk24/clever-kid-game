import React, {Component} from 'react'

class App extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      name: 'world'
    }
  }

  render() {
    return (
      <div className="App">
        <h2> Hello, {this.state.name}! </h2>
      </div>
    )
  }
}

export default App
