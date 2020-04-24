import { put, takeLatest, all, select } from 'redux-saga/effects';

export const getStats = (state) => state.stats;
export const getIsValidCardToBuyArray = (state) => state.isValidCardToBuyArray;
export const getSelectedResourceSlashCards = (state) => state.resourceSlashCards;
export const getMarketSupplyMap = (state) => state.marketSupplyMap;
export const getMarketDemandMap = (state) => state.marketDemandMap;

function* setFetchedCards(action) {
    console.log('in setFetchedCards')
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

    yield put({ 
        type: 'IS_VALID_CARD_TO_BUY_CALCULATED', 
        isValidCardToBuy: calculatedIsValidCardToBuy, 
        cardIndex: action.cardIndex 
    });
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

function* setIsValidResourceToBuyMap(action) {
    console.log('in here')

    const resourceList = ["Brick", "Stick", "Mud", "Stone", "Water", "Apple", "Flower"];
    let marketSupplyMap = new Map();
    let isValidResourceToBuyMap = new Map();

    const stats = yield select(getStats);
    const marketDemandMap = yield select(getMarketDemandMap);

    if (stats != null && marketDemandMap != null) {
        resourceList.map(resource => {
            let marketSupplyResource = action.secondaryOpponentsStats[resource] + action.tertiaryOpponentsStats[resource];
            marketSupplyMap[resource] = marketSupplyResource;
        })
    
        resourceList.map(resource => {
            isValidResourceToBuyMap[resource] = stats["Coin"] > 2 && 
                marketSupplyMap[resource] && 
                marketSupplyMap[resource] > marketDemandMap[resource];
        })
    
        console.log(marketSupplyMap)
        console.log(isValidResourceToBuyMap)
    
        yield put({
            type: 'IS_VALID_RESOURCE_TO_BUY_MAP_CALCULATED',
            marketSupplyMap: marketSupplyMap,
            isValidResourceToBuyMap: isValidResourceToBuyMap,
            updatedStats: stats,
            updateOpponentsStatsOnBackend: action.updateOpponentsStatsOnBackend
        })
    }
}

function* setMarketResource(action) {
    let stats = yield select(getStats);
    let marketSupplyMap = yield select(getMarketSupplyMap);
    let marketDemandMap = yield select(getMarketDemandMap);

    if (stats["Coin"] > 2 && marketSupplyMap[action.resource] > marketDemandMap[action.resource]) {
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
}

function* gameWatcher() {
    yield takeLatest('SET_CARDS', setFetchedCards);
    yield takeLatest('CAN_BUY_CARD', calculateIfValidCardToBuy);
    yield takeLatest('CHOOSE_CARD', setChosenCardIfValid);
    yield takeLatest('SWITCH_RESOURCES', setSwitchedResources);
    yield takeLatest('CALCULATE_IS_VALID_RESOURCE_TO_BUY_MAP', setIsValidResourceToBuyMap);
    yield takeLatest('MARKET_CLICK', setMarketResource);
}

export default function* rootSaga() {
    yield all([
        gameWatcher()
    ]);
}