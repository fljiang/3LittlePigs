import { put, takeLatest, all } from 'redux-saga/effects';

import cards_phase1 from '../components/card/cards_phase1.json'

function* fetchCards() {
    let cards = [];
    let cardsInventory = cards_phase1.map(element => element);
    
    for (let cardNum = 1; cardNum <= 7; cardNum++) {
        let randomNum = Math.floor((Math.random() * (10 - cardNum)));
        let randomCard = cardsInventory[randomNum];
        cardsInventory.splice(randomNum, 1);
        cards.push(randomCard);

        if (cardNum === 7) {
            yield put({ type: "CARDS_RECEIVED", json: cards });
        }
    }
}

function* calculateIfValidCardToBuy(action) {
    if (action.cost.length === 0) {
        yield put({ type: 'IS_VALID_CARD_TO_BUY_CALCULATED', isValidCardToBuy: true, cardIndex: action.cardIndex })
    } else {
        yield put({ type: 'IS_VALID_CARD_TO_BUY_CALCULATED', isValidCardToBuy: false, cardIndex: action.cardIndex })
    }
}

function* cardsWatcher() {
    yield takeLatest('GET_CARDS', fetchCards);
    yield takeLatest('CAN_BUY_CARD', calculateIfValidCardToBuy);
}

export default function* rootSaga() {
    yield all([
        cardsWatcher()
    ]);
}