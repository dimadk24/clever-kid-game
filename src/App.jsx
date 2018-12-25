import React, { Component } from 'react';
import './App.scss';
import CharacterWindow, { LEFT, RIGHT } from './Components/CharacterWindow/CharacterWindow';
import Hero from './Components/Characters/Hero/Hero';
import Monster from './Components/Characters/Monster/Monster';
import SettingsWindow from './Components/SettingsWindow/SettingsWindow';
import SpellWindow from './Components/SpellWindow/SpellWindow';
import TaskWindow from './Components/TaskWindow/TaskWindow';

const MAX_HEALTH = 100;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showingTask: false,
      hero: {
        health: MAX_HEALTH,
        name: 'DimaDK',
      },
      monster: {
        health: MAX_HEALTH,
        name: 'Robot',
      },
    };
  }


  onSuccess() {
    const { taskType } = this.state;
    if (taskType === 'heal') {
      this.updateHeroHealth(+25);
    } else if (taskType === 'attack') {
      this.updateMonsterHealth(-25);
    }
  }

  updateHeroHealth(value) {
    this.setState((prevState) => {
      const newState = { ...prevState };
      newState.hero.health += value;
      if (newState.hero.health > MAX_HEALTH) {
        newState.hero.health = MAX_HEALTH;
      }
      return newState;
    });
  }

  updateMonsterHealth(value) {
    this.setState((prevState) => {
      const newState = { ...prevState };
      newState.monster.health += value;
      return newState;
    });
  }

  showTask({ type }) {
    this.setState({
      showingTask: true,
      taskType: type,
    });
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
        <SpellWindow
          onHeal={() => this.showTask({ type: 'heal' })}
          onAttack={() => this.showTask({ type: 'attack' })}
        />
        {
          showingTask
          && (
            <TaskWindow
              task={task}
              onFail={() => ({})}
              onSuccess={() => this.onSuccess()}
              onClose={() => this.setState({ showingTask: false })}
            />
          )
        }
      </div>
    );
  }
}

export default App;
