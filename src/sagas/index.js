import { put, takeLatest, all, select } from 'redux-saga/effects';

export const getStats = (state) => state.stats;
export const getIsValidCardToBuyArray = (state) => state.isValidCardToBuyArray;
export const getSelectedResourceSlashCards = (state) => state.resourceSlashCards;
export const getMarketDemandMap = (state) => state.marketDemandMap;

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
            action.card.reward.map(rewardElement => {
                if (rewardElement["selected"] === true) {
                    Object.keys(rewardElement).map(function(key, index) {
                        stats[key] += rewardElement[key];
                    })
                }
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

function* setSwitchedResources(action) {
    let selectedResourceSlashCards = yield select(getSelectedResourceSlashCards);
    let updatedStats = yield select(getStats);
    let updateStatsOrNot = false;

    selectedResourceSlashCards.map(function(selectedResourceSlashCard, selectedResourceSlashCardIndex) {
        if (selectedResourceSlashCard.description === action.cardDescription) {
            selectedResourceSlashCard.reward.map(rewardElement => {
                if (Object.keys(rewardElement)[0] === action.newResource &&
                    rewardElement.selected === false) {
                        updateStatsOrNot = true;
                }
            })

            if (updateStatsOrNot) {
                selectedResourceSlashCard.reward.map(function(rewardElement, rewardElementIndex) {
                    if (Object.keys(rewardElement)[0] === action.newResource) {
                        selectedResourceSlashCards[selectedResourceSlashCardIndex]
                            .reward[rewardElementIndex].selected = true

                        const resource = Object.keys(selectedResourceSlashCards[selectedResourceSlashCardIndex]
                            .reward[rewardElementIndex])[0]
                        updatedStats[resource] += 1;
                    } else {
                        selectedResourceSlashCards[selectedResourceSlashCardIndex]
                            .reward[rewardElementIndex].selected = false
                        
                        const resource = Object.keys(selectedResourceSlashCards[selectedResourceSlashCardIndex]
                            .reward[rewardElementIndex])[0]
                        updatedStats[resource] -= 1;
                    }

                })
            }
        }
    })

    if (updateStatsOrNot) {
        yield put({
            type: 'RESOURCE_SWITCHED',
            updatedStats: updatedStats,
            resourceSlashCards: selectedResourceSlashCards,
            updateOpponentsStatsOnBackend: action.updateOpponentsStatsOnBackend
        });
    }
}

function* setMarketResource(action) {
    let stats = yield select(getStats);
    let marketDemandMap = yield select(getMarketDemandMap);

    if (action.secondaryResourceStat) {
        if (action.tertiaryResourceStat) {
            console.log("bought from both opponents");
        }
        else {
            console.log("buy from second opponent");
        }
    }
    else {
        console.log("buy from third opponent");
    }

    stats["Coin"] -=2;
    stats[action.resource] += 1;
    marketDemandMap[action.resource] += 1;

    yield put({
        type: 'MARKET_RESOURCE_CHOSEN',
        updatedStats: stats,
        updatedMarketDemandMap: marketDemandMap,
        updateOpponentsStatsOnBackend: action.updateOpponentsStatsOnBackend
    });
}

function* cardsWatcher() {
    yield takeLatest('SET_CARDS', setFetchedCards);
    yield takeLatest('CAN_BUY_CARD', calculateIfValidCardToBuy);
    yield takeLatest('CHOOSE_CARD', setChosenCardIfValid);
    yield takeLatest('SWITCH_RESOURCES', setSwitchedResources);
    yield takeLatest('MARKET_CLICK', setMarketResource)
}

export default function* rootSaga() {
    yield all([
        cardsWatcher()
    ]);
}