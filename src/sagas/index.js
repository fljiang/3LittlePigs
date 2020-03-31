import { put, takeLatest, all, select } from 'redux-saga/effects';

export const getStats = (state) => state.stats

function* setFetchedCards(action) {
    yield put({ type: "CARDS_SET", cards: action.cards });
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
    yield takeLatest('SET_CARDS', setFetchedCards);
    yield takeLatest('CAN_BUY_CARD', calculateIfValidCardToBuy);
}

export default function* rootSaga() {
    yield all([
        cardsWatcher()
    ]);
}