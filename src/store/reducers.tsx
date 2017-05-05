const CARD_TEXTS = require('./values.json')
// Update once DefinitelyTyped includes uuid 3.0.1
const uuid = require('uuid');
import { createStore } from 'redux';


/*
  Actions:
    TOGGLE_CARD
    ADVANCE_STAGE
    RETREAT_STAGE
*/

const card = (state: any = {}, action: any, stage: number) => {
  switch (action.type) {
    case 'TOGGLE_CARD':
      if (action.key === state.key) {
        const mark = state.mark < stage ? stage : stage - 1;
        return { ...state, mark };
      } else {
        return state;
      }
    case 'ADVANCE_STAGE':
      if (state.mark !== 'accepted') {
        return { ...state, discard: action.stage };
      } else {
        return state;
      }
    default:
      return state;
  }
};

/*
  Cards are:
    A UUID identifier
    Text of the card body
    What round they were selected in
*/

const initialCards = CARD_TEXTS.map((text: any) => ({
  key: uuid.v4(),
  text,
  mark: 0,
}));

const computeCardsNeeded = (cards: any) => {
  const arr = new Array<number>();
  arr.push(0);
  let remaining = cards.length
  while (remaining >= 1) {
    remaining = Math.floor(remaining/2);
    arr.push(remaining);
  }
  return arr;
}
const initialState = {
  cards: initialCards,
  stage: 1,
  cardsNeeded: computeCardsNeeded(initialCards)
}

const reducer = (state: any = initialState, action: any) => {
  switch (action.type) {
    case 'TOGGLE_CARD':
      return {
        cards: state.cards.map((c: any) => card(c, action, state.stage)),
        cardsNeeded: state.cardsNeeded,
        stage: state.stage

      };
    // Nothing currently powers this, but a previous
    // button should work pretty much out of the box
    // if we add one.
    case 'RETREAT_STAGE':
      return {
        cards: state.cards,
        cardsNeeded: state.cardsNeeded,
        stage: Math.max(state - 1, 0)
      };
    case 'ADVANCE_STAGE':
      return {
        cards: state.cards,
        cardsNeeded: state.cardsNeeded,
        stage: state.stage + 1
      };

    default:
      return state;
  }
};

export const store = createStore(reducer);
