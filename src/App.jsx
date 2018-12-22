import React, { Component } from 'react';
import './App.scss';
import CharacterWindow, { LEFT, RIGHT } from './Components/CharacterWindow/CharacterWindow';
import Hero from './Components/Characters/Hero/Hero';
import Monster from './Components/Characters/Monster/Monster';
import SettingsWindow from './Components/SettingsWindow/SettingsWindow';
import SpellWindow from './Components/SpellWindow/SpellWindow';
import TaskWindow from './Components/TaskWindow/TaskWindow';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showingTask: false,
      hero: {
        health: 100,
        name: 'DimaDK',
      },
      monster: {
        health: 100,
        name: 'Robot',
      },
    };
  }

  showTask() {
    this.setState({ showingTask: true });
  }

  render() {
    const { hero, monster, showingTask } = this.state;
    const task = {
      type: 'math',
      math: {
        operands: [2, 2],
        sign: '+',
        solution: 4,
      },
    };
    return (
      <div className="app">
        <CharacterWindow health={hero.health} name={hero.name} position={LEFT} />
        <CharacterWindow health={monster.health} name={monster.name} position={RIGHT} />
        <Hero />
        <Monster />
        <SettingsWindow onChangeSound={() => ({})} />
        <SpellWindow onHeal={() => this.showTask()} onAttack={() => this.showTask()} />
        {
          showingTask
          && (
            <TaskWindow
              task={task}
              onFail={() => ({})}
              onSuccess={() => () => ({})}
              onClose={() => this.setState({ showingTask: false })}
            />
          )
        }
      </div>
    );
  }
}

export default App;
