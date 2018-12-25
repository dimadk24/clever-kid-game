import React, { Component } from 'react';
import './App.scss';
import CharacterWindow, { LEFT, RIGHT } from './Components/CharacterWindow/CharacterWindow';
import Hero from './Components/Characters/Hero/Hero';
import Monster from './Components/Characters/Monster/Monster';
import sleep from './Components/Helpers/utils';
import SettingsWindow from './Components/SettingsWindow/SettingsWindow';
import SpellWindow from './Components/SpellWindow/SpellWindow';
import TaskWindow from './Components/TaskWindow/TaskWindow';

const MAX_HEALTH = 100;
const HEALTH_BAR_ANIMATION_TIME = 300;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isUserTurn: true,
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


  async onSuccess() {
    const { taskType } = this.state;
    if (taskType === 'heal') {
      await this.updateHeroHealth(+25);
    } else if (taskType === 'attack') {
      await this.updateMonsterHealth(-25);
    }
    await this.monsterAttack();
  }

  async monsterAttack() {
    this.setState({ isUserTurn: false });
    await sleep(500);
    await this.updateHeroHealth(-25);
    await sleep(500);
    this.setState({ isUserTurn: true });
  }

  async updateHeroHealth(value) {
    this.setState((prevState) => {
      const newState = { ...prevState };
      newState.hero.health += value;
      if (newState.hero.health > MAX_HEALTH) {
        newState.hero.health = MAX_HEALTH;
      }
      return newState;
    });
    await sleep(HEALTH_BAR_ANIMATION_TIME);
  }

  async updateMonsterHealth(value) {
    this.setState((prevState) => {
      const newState = { ...prevState };
      newState.monster.health += value;
      return newState;
    });
    await sleep(HEALTH_BAR_ANIMATION_TIME);
  }

  showTask({ type }) {
    this.setState({
      showingTask: true,
      taskType: type,
    });
  }

  render() {
    const {
      hero,
      monster,
      showingTask,
      isUserTurn,
    } = this.state;
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
        {
          isUserTurn && (
            <SpellWindow
              onHeal={() => this.showTask({ type: 'heal' })}
              onAttack={() => this.showTask({ type: 'attack' })}
              healIsActive={hero.health < MAX_HEALTH}
            />
          )
        }
        {
          showingTask
          && (
            <TaskWindow
              task={task}
              onFail={() => this.monsterAttack()}
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
