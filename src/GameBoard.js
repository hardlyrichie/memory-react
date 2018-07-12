import React, { Component } from 'react'
import Card from './Card';

const CardState = {
  HIDING: 0,
  SHOWING: 1,
  MATCHIING: 2,
};

class GameBoard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      clicks: 0,
      currentCard: null,
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(id) {
    let {cards} = this.props;
    let {clicks, currentCard} = this.state;
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
      clicks: ++clicks,
      currentCard,
    });
    this.props.updateCards(cards);
  }

  checkWin() {
    const {cards} = this.props;

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
      this.resetGame()
      this.props.onWin();
    }
  }

  resetGame() {
    this.setState({
      clicks: 0,
      currentCard: null,
    })
  }


  render() {
    let {cards} = this.props;

    cards = cards.map(card => (
      <Card
        key={card.id} 
        {...card}
        onClick={this.handleClick}
        count={cards.length}
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