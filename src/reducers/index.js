const reducer = (
    state = {},
    action
) => {
    let emptyArray = Array.apply(null, Array(7)).map(function () {});
    switch (action.type) {
        case 'SET_GAME_TO_JOIN':
            return { ...state, gameToJoin: true };
        case 'SET_CARDS':
            return { ...state, loading: true };
        case 'CARDS_SET':
            return { 
                ...state, 
                loading: false, 
                selectedCards: [],
                resourceSlashCards: [],
                cards: action.cards,
                isValidCardToBuyArray: emptyArray,
                cardChosen: false,
                showSlashCardResources: false,
                isValidResourceToBuyMapCalculated: false
            };
        case 'IS_VALID_CARD_TO_BUY_CALCULATED':
            state.isValidCardToBuyArray[action.cardIndex] = action.isValidCardToBuy;
            return { ...state };
        case 'PASS':
            state.stats["Coin"] += 3;
            state.stats[state.board] += 1;
            action.updateOpponentsStatsOnBackend(state.stats);
            return { 
                ...state, 
                showCardToDiscardButton: true, 
                cardChosen: false
            };
        case 'CARD_CHOSEN':
            emptyArray = Array.apply(null, Array(state.isValidCardToBuyArray.length - 1)).map(function () {});

            if (action.selectedCard.cardType === "Resource_Slash") {
                state.resourceSlashCards.push(action.selectedCard);
            }

            state.selectedCards.push(action.selectedCard);
            state.cards.splice(action.selectedCardIndex, 1);
            action.updateOpponentsStatsOnBackend(action.updatedStats);
            return { 
                ...state, 
                cardChosen: true, 
                stats: action.updatedStats, 
                isValidCardToBuyArray: emptyArray
            };
        case 'SHOW_CARDS_TO_DISCARD':
            return { ...state, showCardToDiscardButton: false };
        case 'DISCARD_CARD':
            emptyArray = Array.apply(null, Array(state.isValidCardToBuyArray.length - 1)).map(function () {});

            delete state.showCardToDiscardButton;
            state.cards.splice(action.cardIndex, 1);
            return { 
                ...state, 
                cardChosen: true, 
                isValidCardToBuyArray: emptyArray
            };
        case 'RE_RENDER_STATS':
            return { 
                ...state,
                statsReRendered: !state.statsReRendered, 
                stats: state.stats,  
                resourceSlashCards: state.resourceSlashCards
            };
        case 'SET_UPDATED_CARDS':
            return { 
                ...state,
                statsReRendered: !state.statsReRendered,
                stats: action.updatedStats, 
                cards: action.cards, 
                cardChosen: false,
                isValidResourceToBuyMapCalculated: false,
                marketDemandMap: null
            };
        case 'TOGGLE_SHOW_SLASH_CARD_RESOURCES':
            return { ...state, showSlashCardResources: !state.showSlashCardResources };
        case 'RESOURCE_SWITCHED':
            action.updateOpponentsStatsOnBackend(action.updatedStats);
            return { ...state, stats: action.updatedStats, resourceSlashCards: action.resourceSlashCards };
        case 'IS_VALID_RESOURCE_TO_BUY_MAP_CALCULATED':
            action.updateOpponentsStatsOnBackend(action.updatedStats);
            return { 
                ...state, 
                board: action.board,
                stats: action.stats,
                marketSupplyMap: action.marketSupplyMap, 
                isValidResourceToBuyMap: action.isValidResourceToBuyMap,
                isValidResourceToBuyMapCalculated: true,
                marketDemandMap: action.marketDemandMap
            };
        case 'UPDATE_MARKET':
            return { ...state, isValidResourceToBuyMapCalculated: false };
        case 'MARKET_RESOURCE_CHOSEN':
            action.updateOpponentsStatsOnBackend(action.updatedStats);
            return { 
                ...state, 
                stats: action.updatedStats, 
                marketDemandMap: action.updatedMarketDemandMap, 
                chooseOpponentToBuyFrom: action.chooseOpponentToBuyFrom,
                opponentsToCoinsToAdd: action.opponentsToCoinsToAdd,
                isValidResourceToBuyMapCalculated: false,
                statsReRendered: !state.statsReRendered,
                resourceToBuy: action.chooseOpponentToBuyFrom ? action.resourceToBuy : null
            };
        case 'OPPONENT_TO_BUY_FROM_CHOSEN':
            return { 
                ...state, 
                chooseOpponentToBuyFrom: false, 
                opponentsToCoinsToAdd: action.opponentsToCoinsToAdd 
            };
        default:
            return state;
    }
};

export default reducer;
