import { put, takeLatest, call, all } from 'redux-saga/effects';

import cards_phase1 from '../components/card/cards_phase1.json'

function getRandomCards() {
    let randomNum = Math.floor((Math.random() * 9));
    return cards_phase1[randomNum];
}

function* fetchCards() {
    const cards = yield call(getRandomCards);
    yield put({ type: "CARDS_RECEIVED", json: cards });
}

function* cardsWatcher() {
    yield takeLatest('GET_CARDS', fetchCards);
}

export default function* rootSaga() {
    yield all([
        cardsWatcher()
    ]);
}