import React, { Component } from 'react';

import './Card.css';

let Card = (props) => {
  let { card, ...otherProps } = props;

  return (
    <div className={`Card ${card.selected ? 'selected' : ''}`} {...otherProps}>
      {card.text}
    </div>
  );
}

export default Card;