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
      {id: 0, cardState: CardState.HIDING, backgroundColor: 'purple'},
      {id: 1, cardState: CardState.HIDING, backgroundColor: 'purple'},
      {id: 2, cardState: CardState.HIDING, backgroundColor: 'aquamarine'},
      {id: 3, cardState: CardState.HIDING, backgroundColor: 'aquamarine'},
      {id: 4, cardState: CardState.HIDING, backgroundColor: 'green'},
      {id: 5, cardState: CardState.HIDING, backgroundColor: 'green'},
      {id: 6, cardState: CardState.HIDING, backgroundColor: 'wheat'},
      {id: 7, cardState: CardState.HIDING, backgroundColor: 'wheat'},
      {id: 8, cardState: CardState.HIDING, backgroundColor: 'black'},
      {id: 9, cardState: CardState.HIDING, backgroundColor: 'black'},
      {id: 10, cardState: CardState.HIDING, backgroundColor: 'red'},
      {id: 11, cardState: CardState.HIDING, backgroundColor: 'red'},
      {id: 12, cardState: CardState.HIDING, backgroundColor: 'yellow'},
      {id: 13, cardState: CardState.HIDING, backgroundColor: 'yellow'},
    ];

    this.state = {
      cards: shuffle(cards),
      clicks: 0,
      currentCard: null,
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(id) {
    let {clicks, cards, currentCard} = this.state;
    if (clicks >= 2) {
      // Reset clicks to 0 and all cards showing to hide
      clicks = 0;
      currentCard = null;
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

    // Can't click same box twice
    if (currentCard && id === currentCard.id ) return;

    // change clicked card state
    cards = cards.map(card => {
      if (card.id === id) {
        let cardState = CardState.SHOWING;
        if (!currentCard) {
          currentCard = {
            color: card.backgroundColor, 
            id: card.id
          };
        } else if (currentCard.color === card.backgroundColor) {
          cardState = CardState.MATCHIING;
          currentCard.matched = true;
        }
        return {
          ...card,
          cardState,
        }
      }
      return card;
    });

    // matched then turn matched card state to matching
    if (currentCard.matched) {
      console.log('matched')
      cards.find(card => card.cardState === CardState.SHOWING).cardState = CardState.MATCHIING;
      currentCard = null;
    }

    this.setState({
      cards,
      clicks: ++clicks,
      currentCard,
    });
  }

  checkWin() {
    const {cards} = this.state;

    let isWin = true;

    for (let card of cards) {
      if (card.cardState !== CardState.MATCHIING) {
        isWin = false;
        break;
      }
    }

    return isWin;
  }
  
  componentDidUpdate() {
    if (this.state.clicks === 2 && this.checkWin()) {
      alert('You won!');
    }
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