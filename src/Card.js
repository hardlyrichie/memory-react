import React, { Component } from 'react'
import './Card.css';

const CardState = {
  HIDING: 0,
  SHOWING: 1,
  MATCHIING: 2,
};

class Card extends Component {
  constructor(props) {
    super(props);
    
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.props.onClick(this.props.id);
  }

  render() {
    let {cardState, count} = this.props;
    let style = {
      width: `calc(100vw / ${count / 2})`,
      height: `calc(100vw / ${count / 2})`,
    }
    if ((cardState === CardState.SHOWING || cardState === CardState.MATCHIING) && this.props.backgroundColor) {
      style.backgroundColor = this.props.backgroundColor;
    }
    
    return (
      <span className='card' onClick={cardState !== CardState.MATCHIING ? this.onClick : null} style={style}></span>
    )
  }
}

export default Card;
