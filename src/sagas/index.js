import { put, takeLatest, all, select } from 'redux-saga/effects';

export const getStats = (state) => state.stats;
export const getIsValidCardToBuyArray = (state) => state.isValidCardToBuyArray;
export const getSelectedResourceSlashCards = (state) => state.resourceSlashCards;
export const getMarketSupplyMap = (state) => state.marketSupplyMap;
export const getMarketDemandMap = (state) => state.marketDemandMap;
export const getOpponentsToCoinsToAddMap = (state) => 
    state.opponentsToCoinsToAddMap ? state.opponentsToCoinsToAddMap : new Map();

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

        action.setSelectedCardOnBackend(action.card, "select", action.chooseOpponentToBuyFrom);

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
    const resourceList = ["Brick", "Stick", "Mud", "Stone", "Water", "Apple", "Flower"];
    let marketSupplyMap = new Map();
    let isValidResourceToBuyMap = new Map();

    let stats = yield select(getStats);
    let marketDemandMap = yield select(getMarketDemandMap);

    if (stats == null) {
        stats = {
            "Coin": 3,
            "Victory": 0,
            "Brick": action.resource === "Brick" ? 1 : 0,
            "Stick": action.resource === "Stick" ? 1 : 0,
            "Mud": action.resource === "Mud" ? 1 : 0,
            "Stone": 0,
            "Apple": 0,
            "Water": 0,
            "Flower": 0,
            "Wolf": 0,
            "Glass": 0,
            "Pot": 0,
            "Spoon": 0
        }
    }

    if (marketDemandMap == null) {
        marketDemandMap = {
            "Brick": 0,
            "Stick": 0,
            "Mud": 0,
            "Stone" : 0,
            "Water": 0,
            "Flower": 0,
            "Apple": 0
        };
    }

    resourceList.map(resource => {
        let marketSupplyResource = action.secondaryOpponentsStats[resource] + action.tertiaryOpponentsStats[resource];
        marketSupplyMap.set(resource, marketSupplyResource);
    })

    resourceList.map(resource => {
        isValidResourceToBuyMap.set(resource, 
            stats["Coin"] >= 2 && 
            marketSupplyMap.get(resource) && 
            marketSupplyMap.get(resource) > marketDemandMap[resource]);
    })

    yield put({
        type: 'IS_VALID_RESOURCE_TO_BUY_MAP_CALCULATED',
        board: action.resource,
        stats: stats,
        marketSupplyMap: marketSupplyMap,
        isValidResourceToBuyMap: isValidResourceToBuyMap,
        updateOpponentsStatsOnBackend: action.updateOpponentsStatsOnBackend,
        marketDemandMap: marketDemandMap
    })
}

function* setMarketResource(action) {
    let stats = yield select(getStats);
    let marketSupplyMap = yield select(getMarketSupplyMap);
    let marketDemandMap = yield select(getMarketDemandMap);
    let opponentsToCoinsToAddMap = yield select(getOpponentsToCoinsToAddMap);
    
    let chooseOpponentToBuyFrom = false;

    if (stats["Coin"] >= 2 && marketSupplyMap.get(action.resource) > marketDemandMap[action.resource]) {
        stats["Coin"] -=2;
        stats[action.resource] += 1;
        marketDemandMap[action.resource] += 1;

        if (action.secondaryOpponentsStats[action.resource] > 0 && 
            action.tertiaryOpponentsStats[action.resource] > 0) {
            chooseOpponentToBuyFrom = true;
        } else {
            if (action.secondaryOpponentsStats[action.resource] > 0) {
                if (opponentsToCoinsToAddMap.get(action.secondaryBoardResource) != null) {
                    opponentsToCoinsToAddMap.set(
                        action.secondaryBoardResource,
                        opponentsToCoinsToAddMap.get(action.secondaryBoardResource) + 2
                    )
                } else {
                    opponentsToCoinsToAddMap.set(action.secondaryBoardResource, 2);
                }
            } else {
                if (opponentsToCoinsToAddMap.get(action.tertiaryBoardResource) != null) {
                    opponentsToCoinsToAddMap.set(
                        action.tertiaryBoardResource,
                        opponentsToCoinsToAddMap.get(action.tertiaryBoardResource) + 2
                    )
                } else {
                    opponentsToCoinsToAddMap.set(action.tertiaryBoardResource, 2);
                }
            }
        }

        yield put({
            type: 'MARKET_RESOURCE_CHOSEN',
            updatedStats: stats,
            updatedMarketDemandMap: marketDemandMap,
            chooseOpponentToBuyFrom: chooseOpponentToBuyFrom,
            opponentsToCoinsToAdd: opponentsToCoinsToAddMap,
            updateOpponentsStatsOnBackend: action.updateOpponentsStatsOnBackend
        });
    }
}

function* setOpponentToBuyFrom(action) {
    let opponentsToCoinsToAddMap = yield select(getOpponentsToCoinsToAddMap);
    
    if (opponentsToCoinsToAddMap.get(action.opponentToBuyFrom) != null) {
        opponentsToCoinsToAddMap.set(
            action.opponentToBuyFrom,
            opponentsToCoinsToAddMap.get(action.opponentToBuyFrom) + 2
        )
    } else {
        opponentsToCoinsToAddMap.set(action.opponentToBuyFrom, 2);
    }

    yield put({
        type: 'OPPONENT_TO_BUY_FROM_CHOSEN',
        chooseOpponentToBuyFrom: false,
        opponentsToCoinsToAdd: getOpponentsToCoinsToAddMap
    })
}

function* gameWatcher() {
    yield takeLatest('SET_CARDS', setFetchedCards);
    yield takeLatest('CAN_BUY_CARD', calculateIfValidCardToBuy);
    yield takeLatest('CHOOSE_CARD', setChosenCardIfValid);
    yield takeLatest('SWITCH_RESOURCES', setSwitchedResources);
    yield takeLatest('CALCULATE_IS_VALID_RESOURCE_TO_BUY_MAP', setIsValidResourceToBuyMap);
    yield takeLatest('MARKET_CLICK', setMarketResource);
    yield takeLatest('CHOOSE_OPPONENT_TO_BUY_FROM_CLICK', setOpponentToBuyFrom);
}

export default function* rootSaga() {
    yield all([
        gameWatcher()
    ]);
}