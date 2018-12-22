import React, { Component } from 'react';
import './App.scss';
import CharacterWindow, { LEFT, RIGHT } from './Components/CharacterWindow/CharacterWindow';
import Hero from './Components/Characters/Hero/Hero';
import Monster from './Components/Characters/Monster/Monster';
import SettingsWindow from './Components/SettingsWindow/SettingsWindow';
import SpellWindow from './Components/SpellWindow/SpellWindow';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
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

  render() {
    const { hero, monster } = this.state;
    return (
      <div className="app">
        <CharacterWindow health={hero.health} name={hero.name} position={LEFT} />
        <CharacterWindow health={monster.health} name={monster.name} position={RIGHT} />
        <Hero />
        <Monster />
        <SettingsWindow onChangeSound={() => ({})} />
        <SpellWindow onHeal={() => ({})} onAttack={() => ({})} />
      </div>
    );
  }
}

export default App;
