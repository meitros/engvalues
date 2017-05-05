import React, { Component } from 'react';
import _ from 'lodash';

import Card from './Card';

import './ShufflingCardGrid.css';

export default class ShufflingCardGrid extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight,

      centered: false,
      cardIndex: _.fromPairs(
        this.props.cards.map((c, index) => [c.text, index])
      )
    };
    // Just for demo purposes
    window.addEventListener('click', this.shuffle);
  }

  handleResize = () => {
    this.setState({
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight
    });
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
  }

  shuffle = () => {
    let n = this.props.cards.length;
    let newCards = this.props.cards.slice();
    for (let idx of _.range(n)) {
      let swapIdx = _.random(idx, n - 1);
      [newCards[swapIdx], newCards[idx]] = [newCards[idx], newCards[swapIdx]];
    }
    this.setState({
      // centered: true,
      cardIndex: _.fromPairs(
        newCards.map((c, index) => [c.text, index])
      )
    });
    setTimeout(() => this.setState({ centered: false }), 400);
  }

  render() {
    let app = this.props.app;

    const gridHeight = this.state.windowHeight;
    const gridWidth = Math.min(this.state.windowWidth, 900);
    const cardWidth = 160;
    const cardHeight = 120;
    const cardsPerRow = Math.floor(gridWidth / cardWidth);

    const indexToXPos = index => {
      const col = index % cardsPerRow;
      const padding = (col + 1) * this.props.padding;
      return (col * cardWidth) + padding;
    }
    const indexToYPos = index => {
      const row = Math.floor(index / cardsPerRow);
      const padding = (row + 1) * this.props.padding;
      return (row * cardHeight) + padding;
    }
    const transitionTime = index => {
      return 400 + (index % 6 * 50);
    }

    const actualGridWidth = indexToXPos(cardsPerRow - 1) + this.props.padding + cardWidth;

    const centeredX = (gridWidth - cardWidth) / 2;
    const centeredY = (gridHeight - cardHeight) / 2;

    let cardBackgrounds = this.props.cards.map((_, index) => (
      <div
        key={index}
        className="Card fake"
        style={{
          top: indexToYPos(index),
          left: indexToXPos(index),
          width: cardWidth,
          height: cardHeight
        }}
      />
    ));

    let cards = this.props.cards.map((card, cardIndex) => {
      let index = this.state.cardIndex[card.text];
      return (
        <Card
          key={card.text}
          card={card}
          style={{
            top: this.state.centered ? centeredY : indexToYPos(index),
            left: this.state.centered ? centeredX : indexToXPos(index),
            width: cardWidth,
            height: cardHeight,
            transition: `all ${transitionTime(cardIndex)}ms ease-in-out, box-shadow 80ms linear, background-color 80ms linear`
          }}
          onClick={(e) => {
            e.stopPropagation();
            this.props.selectCard(card);
          }}
        />
      );
    });

    return (
      <div
        style={{ width: actualGridWidth }}
        className="ShufflingCardGrid">
        {cardBackgrounds}
        {cards}
      </div>
    );
  }
}

ShufflingCardGrid.defaultProps = {
  cards: [],
  padding: 10,
};
