import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CharacterWindow, { LEFT, RIGHT } from './Components/CharacterWindow/CharacterWindow';
import Hero from './Components/Characters/Hero/Hero';
import Monster from './Components/Characters/Monster/Monster';
import { sleep } from './Components/Helpers/utils';
import MonsterCounterWindow from './Components/MonsterCounterWindow/MonsterCounterWindow';
import SettingsWindow from './Components/SettingsWindow/SettingsWindow';
import SpellWindow from './Components/SpellWindow/SpellWindow';
import TaskWindow from './Components/TaskWindow/TaskWindow';

const MAX_HEALTH = 100;
const MIN_HEALTH = 0;
const HEALTH_BAR_ANIMATION_TIME = 300;

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isUserTurn: true,
      showingTask: false,
      hero: {
        health: MAX_HEALTH,
        name: props.username,
      },
      monster: {
        health: MAX_HEALTH,
        name: 'Robot',
      },
      winCount: 0,
    };
    this.onDead = (...args) => props.onDead(...args);
  }

  async onSuccess() {
    const { taskType, hero } = this.state;
    let shouldMonsterAttack;
    if (taskType === 'heal') {
      await this.updateHeroHealth(+25);
      shouldMonsterAttack = true;
    } else if (taskType === 'attack') {
      shouldMonsterAttack = await this.updateMonsterHealth(-25);
    }
    if (shouldMonsterAttack && hero.health) await this.monsterAttack();
  }

  async monsterAttack() {
    const { hero } = this.state;
    this.setState({ isUserTurn: false });
    await sleep(500);
    await this.updateHeroHealth(-25);
    await sleep(500);
    if (hero.health) this.setState({ isUserTurn: true });
  }

  async updateHeroHealth(value) {
    const { winCount } = this.state;
    let isDead = false;
    this.setState((prevState) => {
      const newState = { ...prevState };
      newState.hero.health += value;
      if (newState.hero.health > MAX_HEALTH) {
        newState.hero.health = MAX_HEALTH;
      } else if (newState.hero.health < MIN_HEALTH) {
        newState.hero.health = MIN_HEALTH;
      }
      if (newState.hero.health === 0) isDead = true;
      return newState;
    });
    await sleep(HEALTH_BAR_ANIMATION_TIME);
    if (isDead) this.onDead(winCount);
  }

  async updateMonsterHealth(value) {
    let shouldMonsterAttack = true;
    this.setState((prevState) => {
      const newState = { ...prevState };
      newState.monster.health += value;
      if (newState.monster.health < MIN_HEALTH) {
        newState.monster.health = MIN_HEALTH;
      }
      if (newState.monster.health === MIN_HEALTH) {
        newState.winCount += 1;
        newState.monster.health = 100;
        newState.hero.health = 100;
        shouldMonsterAttack = false;
      }
      return newState;
    });
    await sleep(HEALTH_BAR_ANIMATION_TIME);
    return shouldMonsterAttack;
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
      winCount,
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
        <MonsterCounterWindow number={winCount} />
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
          showingTask && (
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

Game.propTypes = {
  username: PropTypes.string.isRequired,
  onDead: PropTypes.func.isRequired,
};

export default Game;
