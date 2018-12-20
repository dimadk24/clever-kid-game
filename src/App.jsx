import React from 'react';
import './App.scss';
import CharacterWindow, { LEFT, RIGHT } from './Components/CharacterWindow/CharacterWindow';
import Hero from './Components/Characters/Hero/Hero';
import Monster from './Components/Characters/Monster/Monster';

function App() {
  return (
    <div className="app">
      <CharacterWindow health={100} name="DimaDK" position={LEFT} />
      <CharacterWindow health={100} name="Robot" position={RIGHT} />
      <Hero />
      <Monster />
    </div>
  );
}

export default App;
