import './StageInfo.css';
import { Component } from 'react';
import * as React from 'react';

export default class StageInfo extends Component<any, any> {
  constructor(props: any, context: any) {
    super(props, context);

  }

  render() {
    const numSelected = this.props.cards.filter( (c: any) => c.mark == this.props.stage).length;
    const needed = this.props.cardsNeeded[this.props.stage]

    let button = null
    if (numSelected == needed) {
      button = <span
        onClick={(e: any) => {
          e.stopPropagation();
          this.props.onAdvanceStage(this.props.stage)}
        }
        style={{
          paddingLeft: '10px',
          cursor: 'pointer'
        }}>
        Advance
      </span>
    }

    return (
        <h1 className="instructions">
        <span style={{paddingRight: '10px'}} key={'Round_' + this.props.stage}>Round {this.props.stage} </span>
          Select the things you value
          the most: <span className="progress">
            <span className="number-selected" key={numSelected}>{numSelected}</span> / {needed}
          </span>
          {button != null? button: null}
        </h1>
    );
  }
}

