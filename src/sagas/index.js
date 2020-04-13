import { put, takeLatest, all, select } from 'redux-saga/effects';

export const getStats = (state) => state.stats
export const getIsValidCardToBuyArray = (state) => state.isValidCardToBuyArray

function* setFetchedCards(action) {
    yield put({ type: "CARDS_SET", cards: action.cards, board: action.board });
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

function* setChosenCardIfValid(action) {
    const isValidCardToBuyArray = yield select(getIsValidCardToBuyArray);
    if (isValidCardToBuyArray[action.cardIndex]) {
        let stats = yield select(getStats);

        action.card.cost.map(element =>
            Object.keys(element).map(function(key, index) {
                if (key === "Coin") {
                    stats[key] -= element[key];
                }
            })
        );

        if (action.card.cardType != "Market" && action.card.cardType != "Resource_Slash") {
            action.card.reward.map(element => {
                const key = Object.keys(element)[0]
                stats[key] += element[key];
            });
        } else if (action.card.cardType === "Resource_Slash") {
            const rewardElement = action.card.reward[0]
            Object.keys(rewardElement).map(function(key, index) {
                stats[key] += rewardElement[key];
            })
        }

        action.setSelectedCardOnBackend(action.card, "select");

        yield put({ 
            type: 'CARD_CHOSEN', 
            updatedStats: stats, 
            selectedCard: action.card, 
            selectedCardIndex: action.cardIndex,
            updateOpponentsStatsOnBackend: action.updateOpponentsStatsOnBackend
         })
    }
}

function* cardsWatcher() {
    yield takeLatest('SET_CARDS', setFetchedCards);
    yield takeLatest('CAN_BUY_CARD', calculateIfValidCardToBuy);
    yield takeLatest('CHOOSE_CARD', setChosenCardIfValid);
}

export default function* rootSaga() {
    yield all([
        cardsWatcher()
    ]);
}