import React from 'react';
import './App.scss';
import CharacterDisplay, { LEFT, RIGHT } from './Components/CharacterDisplay/CharacterDisplay';
import Hero from './Components/Characters/Hero/Hero';
import Monster from './Components/Characters/Monster/Monster';

function App() {
  return (
    <div className="app">
      <CharacterDisplay health={100} name="DimaDK" position={LEFT} />
      <CharacterDisplay health={100} name="Robot" position={RIGHT} />
      <Hero />
      <Monster />
    </div>
  );
}

export default App;
