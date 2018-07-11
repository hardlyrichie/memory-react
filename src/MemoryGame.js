import React, { Component } from 'react';
import './MemoryGame.css';
import GameBoard from './GameBoard';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Memory Game</h1>
        <Menu />>
        <GameBoard />
      </div>
    );
  }
}

export default App;
