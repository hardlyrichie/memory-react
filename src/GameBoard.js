import React, { Component } from 'react'
import Card from './Card';

const CardState = {
  HIDING: 0,
  SHOWING: 1,
  MATCHIING: 2,
};

function shuffle(a) {
  let arr = a.map(obj => ({...obj}));
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

class GameBoard extends Component {
  constructor(props) {
    super(props);

    let cards = [
      {id: 0, cardState: CardState.HIDING, backgroundColor: 'red'},
      {id: 1, cardState: CardState.HIDING, backgroundColor: 'red'},
      {id: 2, cardState: CardState.HIDING, backgroundColor: 'navy'},
      {id: 3, cardState: CardState.HIDING, backgroundColor: 'navy'},
      {id: 4, cardState: CardState.HIDING, backgroundColor: 'green'},
      {id: 5, cardState: CardState.HIDING, backgroundColor: 'green'},
      {id: 6, cardState: CardState.HIDING, backgroundColor: 'yellow'},
      {id: 7, cardState: CardState.HIDING, backgroundColor: 'yellow'},
      {id: 8, cardState: CardState.HIDING, backgroundColor: 'black'},
      {id: 9, cardState: CardState.HIDING, backgroundColor: 'black'},
      {id: 10, cardState: CardState.HIDING, backgroundColor: 'purple'},
      {id: 11, cardState: CardState.HIDING, backgroundColor: 'purple'},
      {id: 12, cardState: CardState.HIDING, backgroundColor: 'pink'},
      {id: 13, cardState: CardState.HIDING, backgroundColor: 'pink'},
      {id: 14, cardState: CardState.HIDING, backgroundColor: 'lightskyblue'},
      {id: 15, cardState: CardState.HIDING, backgroundColor: 'lightskyblue'},
    ];

    this.state = {
      cards: shuffle(cards),
      clicks: 0,
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(id) {
    let {clicks, cards} = this.state;

    if (clicks >= 2) {
      // Reset clicks to 0 and all cards showing to hide
      clicks = 0;
      cards = cards.map(card => {
        if (card.cardState === CardState.SHOWING) {
          return {
            ...card,
            cardState: CardState.HIDING,
          }
        }
        return card;
      });
    }

    cards = cards.map(card => {
      if (card.id === id) {
        return {
          ...card,
          cardState: CardState.SHOWING,
        }
      }
      return card;
    });

    this.setState({
      cards,
      clicks: ++clicks,
    });
  }

  render() {
    let cards = this.state.cards.map(card => (
      <Card
        key={card.id} 
        {...card}
        onClick={this.handleClick}
      />
    ));

    return (
      <div>
        {cards}
      </div>
    )
  }
}

export default GameBoard;