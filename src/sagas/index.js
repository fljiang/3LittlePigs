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

        if (cardNum == 7) {
            yield put({ type: "CARDS_RECEIVED", json: cards });
        }
    }
}

function* cardsWatcher() {
    yield takeLatest('GET_CARDS', fetchCards);
}

export default function* rootSaga() {
    yield all([
        cardsWatcher()
    ]);
}