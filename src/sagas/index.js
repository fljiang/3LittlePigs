import { put, takeLatest, all } from 'redux-saga/effects';

import { cards } from '../components/card/card.json'

function* fetchCards() {
    yield put({ type: "CARDS_RECEIVED", json: cards });
}

function* cardsWatcher() {
    yield takeLatest('GET_CARDS', fetchCards)
}

export default function* rootSaga() {
    yield all([
        cardsWatcher()
    ]);
}
