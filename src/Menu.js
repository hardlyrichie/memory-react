import React, { Component } from 'react'
import './Menu.css';

class Menu extends Component {
  handleClick(e) {
    this.props.onClick(e.target.className);
  }

  render() {
    return (
      <div className='menu'>
        <span className='easy' onClick={(e) => this.handleClick(e)}>Easy</span>
        <span className='medium' onClick={(e) => this.handleClick(e)}>Medium</span>
        <span className='hard' onClick={(e) => this.handleClick(e)}>Hard</span>
      </div>
    )
  }
}

export default Menu;