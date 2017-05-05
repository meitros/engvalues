import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import ShufflingCardGrid from './components/ShufflingCardGrid';
import Values from './values';

import './style.css';

class ValuesApp extends Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      stage: 0,
      cards: Values.map((v, index) => ({ text: v, index, discarded: false, selected: false }))
    }
  }

  selectCard = (card) => {
    let newCards = this.state.cards.map(c => {
      if (c.text === card.text) {
        return Object.assign({}, c, { selected: !c.selected });
      }
      return c;
    });
    this.setState({cards: newCards});
  }

  render() {
    const numSelected = this.state.cards.filter(c => c.selected).length;
    const needed = Math.floor(this.state.cards.length / 2);

    let callbacks = {
      selectCard: this.selectCard,
    };

    return (
      <div className="ValuesApp">
        <h1 className="instructions">
          Select the things you value the most: 
          <span className="progress">
            <span className="number-selected" key={numSelected}>{ numSelected }</span> / { needed }
          </span>
        </h1>
        <ShufflingCardGrid app={this} { ...this.state } { ...callbacks } />
      </div>
    );
  }
}

ReactDOM.render(
  <ValuesApp />,
  document.getElementById('root')
);
