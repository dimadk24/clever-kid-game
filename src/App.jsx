import React from 'react';
import './App.scss';
import Hero from './Components/Characters/Hero/Hero';
import Monster from './Components/Characters/Monster/Monster';

function App() {
  return (
    <div className="app">
      <Hero />
      <Monster />
    </div>
  );
}

export default App;
