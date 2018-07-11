import React, { Component } from 'react';
import './MemoryGame.css';
import GameBoard from './GameBoard';

class App extends Component {
  render() {
    return (
      <div className="App">
        Memory
        <GameBoard />
      </div>
    );
  }
}

export default App;
