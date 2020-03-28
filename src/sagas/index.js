import { put, takeLatest, all, select } from 'redux-saga/effects';

import cards_phase1 from '../components/card/cards_phase1.json'

export const getStats = (state) => state.stats

function* fetchCards() {
    let cards = [];
    let cardsInventory = cards_phase1.map(element => element);
    
    for (let cardNum = 1; cardNum <= 7; cardNum++) {
        let randomNum = Math.floor((Math.random() * (12 - cardNum)));
        let randomCard = cardsInventory[randomNum];
        cardsInventory.splice(randomNum, 1);
        cards.push(randomCard);

        if (cardNum === 7) {
            yield put({ type: "CARDS_RECEIVED", json: cards });
        }
    }
}

function* calculateIfValidCardToBuy(action) {
    const stats = yield select(getStats); 
    let calculatedIsValidCardToBuy = true;

    action.cost.map(element =>
        Object.keys(element).map(function(key, index) {
            if (stats[key] < element[key]) {
                calculatedIsValidCardToBuy = false;
            }
        })
    );

    yield put({ type: 'IS_VALID_CARD_TO_BUY_CALCULATED', isValidCardToBuy: calculatedIsValidCardToBuy, cardIndex: action.cardIndex });
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