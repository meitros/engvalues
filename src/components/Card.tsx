import { Component } from 'react';
import * as React from 'react';

import './Card.css';

class Card extends Component<any, any> {
  constructor(props: any, context: any) {
    super(props, context);
    this.state = {};
  }

  render() {
    let substyle = ''

    /*
      If the card was marked in the current stage, it should be "selected" in the UI.
      If the maximum number of cards in a stage has been selected, it should not be
      possible to select additional cards (but unselection should work).
    */
    if (this.props.mark == this.props.stage) {
      substyle = 'selected'
    } else if (this.props.locked) {
      substyle = 'locked'
    }


    return (
      <div
        className={'Card ' + substyle}
        style={this.props.style}
        onClick={this.props.locked ? (e: any) => {e.stopPropagation();} : this.props.onClick}
        >
        { this.props.text }
      </div>
    );
  }
}

namespace Card {
  export const defaultProps = {}
}

export default Card;
