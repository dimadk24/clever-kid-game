import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Bomb, { ANIMATION_DURATION as BOMB_ANIMATION_TIME } from './Components/Animations/Bomb/Bomb';
import Hero from './Components/Characters/Hero/Hero';
import Monster from './Components/Characters/Monster/Monster';
import CharacterWindow, { LEFT, RIGHT } from './Components/Windows/CharacterWindow/CharacterWindow';
import { generateMonsterName, sleep } from './Components/Helpers/utils';
import ChooseTaskWindow from './Components/Windows/ChooseTaskWindow/ChooseTaskWindow';
import MonsterCounterWindow from './Components/Windows/MonsterCounterWindow/MonsterCounterWindow';
import SettingsWindow from './Components/Windows/SettingsWindow/SettingsWindow';
import SpellWindow from './Components/Windows/SpellWindow/SpellWindow';
import TaskWindow from './Components/Windows/TaskWindow/TaskWindow';
import Heal, { ANIMATION_TIME as HEAL_ANIMATION_TIME } from './Components/Animations/Heal/Heal';

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
        name: generateMonsterName(),
      },
      winCount: 0,
      animateBomb: false,
      animationPosition: '',
      animateHeal: false,
      sounds: true,
      animatingHealthBar: false,
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

  onChooseTask(taskName) {
    this.setState({ task: taskName, showingTask: true, choosingTask: false });
  }

  async monsterAttack() {
    const { hero } = this.state;
    this.setState({ isUserTurn: false });
    await sleep(500);
    await this.updateHeroHealth(-25);
    await sleep(500);
    if (hero.health) this.setState({ isUserTurn: true });
  }

  async animateBomb(position) {
    this.setState({ animateBomb: true, animationPosition: position });
    await sleep(BOMB_ANIMATION_TIME);
    this.setState({ animateBomb: false });
  }

  async animateHeal() {
    this.setState({ animateHeal: true });
    await sleep(HEAL_ANIMATION_TIME);
    this.setState({ animateHeal: false });
  }

  async updateHeroHealth(value) {
    const { winCount } = this.state;
    let isDead = false;
    if (value < 0) await this.animateBomb('left');
    else await this.animateHeal();
    this.setState((prevState) => {
      const newState = { ...prevState };
      newState.hero.health += value;
      newState.animatingHealthBar = true;
      if (newState.hero.health > MAX_HEALTH) {
        newState.hero.health = MAX_HEALTH;
      } else if (newState.hero.health < MIN_HEALTH) {
        newState.hero.health = MIN_HEALTH;
      }
      if (newState.hero.health === 0) isDead = true;
      return newState;
    });
    await sleep(HEALTH_BAR_ANIMATION_TIME);
    this.setState({ animatingHealthBar: false });
    if (isDead) this.onDead(winCount);
  }

  async updateMonsterHealth(value) {
    let shouldMonsterAttack = true;
    if (value < 0) await this.animateBomb('right');
    this.setState((prevState) => {
      const newState = { ...prevState };
      newState.monster.health += value;
      newState.animatingHealthBar = true;
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
    this.setState({ animatingHealthBar: false });
    return shouldMonsterAttack;
  }

  showTask({ type }) {
    this.setState({
      choosingTask: true,
      taskType: type,
    });
  }

  render() {
    const {
      hero,
      monster,
      showingTask,
      choosingTask,
      isUserTurn,
      task,
      winCount,
      animateBomb,
      animationPosition,
      animateHeal,
      animatingHealthBar,
      sounds,
    } = this.state;
    const animating = animateBomb || animateHeal || animatingHealthBar;
    return (
      <div className="game">
        <CharacterWindow health={hero.health} name={hero.name} position={LEFT} />
        <MonsterCounterWindow number={winCount} />
        <CharacterWindow health={monster.health} name={monster.name} position={RIGHT} />
        <Hero />
        <Monster />
        <SettingsWindow onChangeSound={soundsState => this.setState({ sounds: soundsState })} />
        {
          isUserTurn && !showingTask && !animating && !choosingTask && (
            <SpellWindow
              onHeal={() => this.showTask({ type: 'heal' })}
              onAttack={() => this.showTask({ type: 'attack' })}
              healIsActive={hero.health < MAX_HEALTH}
            />
          )
        }
        {
          choosingTask && (
            <ChooseTaskWindow
              onChoose={choosenTask => this.onChooseTask(choosenTask)}
              onClose={() => this.setState({ choosingTask: false })}
            />
          )
        }
        {
          showingTask && (
            <TaskWindow
              taskName={task}
              onFail={() => this.monsterAttack()}
              onSuccess={() => this.onSuccess()}
              onClose={() => this.setState({ showingTask: false })}
            />
          )
        }
        {
          animateBomb && <Bomb position={animationPosition} sounds={sounds} />
        }
        {
          animateHeal && <Heal sounds={sounds} />
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
