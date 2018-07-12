import React, { Component } from 'react';
import './MemoryGame.css';
import Menu from './Menu';
import GameBoard from './GameBoard';

const CardState = {
  HIDING: 0,
  SHOWING: 1,
  MATCHIING: 2,
};

const Colors = [
  "#f0ffff",
  "#f5f5dc",
  "#000000",
  "#0000ff",
  "#a52a2a",
  "#00ffff",
  "#00008b",
  "#008b8b",
  "#a9a9a9",
  "#006400",
  "#bdb76b",
  "#556b2f",
  "#ff8c00",
  "#9932cc",
  "#8b0000",
  "#e9967a",
  "#9400d3",
  "#ff00ff",
  "#ffd700",
  "#008000",
  "#4b0082",
  "#f0e68c",
  "#add8e6",
  "#e0ffff",
  "#90ee90",
  "#d3d3d3",
  "#ffb6c1",
  "#ffffe0",
  "#00ff00",
  "#ff00ff",
  "#800000",
  "#000080",
  "#808000",
  "#ffa500",
  "#ffc0cb",
  "#800080",
  "#ff0000",
  "#c0c0c0",
  "#ffffff",
  "#ffff00",
];

function shuffle(a) {
  let arr = a;
  if (typeof a[0] === 'object')
    arr = a.map(obj => ({...obj}));
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      difficulty: null,
      showMenu: true,
      cards: null,
    }

    this.handleClick = this.handleClick.bind(this);
    this.handleWin = this.handleWin.bind(this);
    this.handleUpdateCards = this.handleUpdateCards.bind(this);
  }

  handleClick(name) {
    console.log(name);
    this.setState({
      difficulty: name,
      showMenu: false,
      cards: shuffle(this.getNewCards(name)),
    });
  }

  handleWin() {
    this.setState({showMenu: true});
  }

  handleUpdateCards(cards) {
    this.setState({cards});
  }

  getNewCards(difficulty) {
    let cards;
    switch (difficulty) {
      case 'easy':
        cards = Array(14);
        break;
      case 'medium':
        cards = Array(24);
        break;
      case 'hard':
        cards = Array(48);
        break;
      default:
        cards = Array(4);
    }
    
    let bgColor, colors = shuffle([...Colors]);

    cards = cards.fill('').map((curr, index) => {
      if (!(index % 2)) {
        bgColor = colors.pop();
      }
      return {
        id: index,
        cardState: CardState.HIDING,
        backgroundColor: bgColor,
      };
    });

    return cards;
  }

  render() {
    return (
      <div className="App">
        <h1>Memory Game</h1>
        {this.state.difficulty && this.state.showMenu &&
          <h2>YOU WON! CONGRATS. PLAY AGAIN?</h2> 
        }
        {this.state.showMenu &&
          <Menu onClick={this.handleClick}/>
        }
        {this.state.difficulty &&
          <GameBoard onWin={this.handleWin} cards={this.state.cards} updateCards={this.handleUpdateCards}/>
        }
      </div>
    );
  }
}

export default App;
