import React from 'react';
import './App.scss';
import CharacterWindow, { LEFT, RIGHT } from './Components/CharacterWindow/CharacterWindow';
import Hero from './Components/Characters/Hero/Hero';
import Monster from './Components/Characters/Monster/Monster';
import SettingsWindow from './Components/SettingsWindow/SettingsWindow';

function App() {
  return (
    <div className="app">
      <CharacterWindow health={100} name="DimaDK" position={LEFT} />
      <CharacterWindow health={100} name="Robot" position={RIGHT} />
      <Hero />
      <Monster />
      <SettingsWindow onChangeSound={() => ({})} />
    </div>
  );
}

export default App;
