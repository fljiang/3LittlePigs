const defaultMarketDemandMap = {
    "Brick": 0,
    "Stick": 0,
    "Mud": 0,
    "Stone" : 0,
    "Water": 0,
    "Flower": 0,
    "Apple": 0
};

const reducer = (
    state = {},
    action
) => {
    let emptyArray = Array.apply(null, Array(7)).map(function () {});
    switch (action.type) {
        case 'SET_CARDS':
            return { ...state, loading: true };
        case 'CARDS_SET':
            return { 
                ...state, 
                loading: false, 
                board: action.board,
                selectedCards: [],
                resourceSlashCards: [],
                cards: action.cards,
                isValidCardToBuyArray: emptyArray,
                cardChosen: false,
                stats: {
                    "Coin": 3,
                    "Victory": 0,
                    "Brick": action.board === "Brick" ? 1 : 0,
                    "Stick": action.board === "Stick" ? 1 : 0,
                    "Mud": action.board === "Mud" ? 1 : 0,
                    "Stone": 0,
                    "Apple": 0,
                    "Water": 0,
                    "Flower": 0,
                    "Wolf": 0,
                    "Glass": 0,
                    "Pot": 0,
                    "Spoon": 0
                },
                showSlashCardResources: false,
                marketDemandMap: defaultMarketDemandMap
            };
        case 'IS_VALID_CARD_TO_BUY_CALCULATED':
            state.isValidCardToBuyArray[action.cardIndex] = action.isValidCardToBuy;
            return { ...state };
        case 'PASS':
            state.stats["Coin"] += 3;
            state.stats[state.board] += 1;
            action.updateOpponentsStatsOnBackend(state.stats);
            return { ...state, showCardToDiscardButton: true, cardChosen: false, marketSupplyMap: defaultMarketDemandMap };
        case 'CARD_CHOSEN':
            emptyArray = Array.apply(null, Array(state.isValidCardToBuyArray.length - 1)).map(function () {});

            if (action.selectedCard.cardType === "Resource_Slash") {
                state.resourceSlashCards.push(action.selectedCard);
            }

            state.selectedCards.push(action.selectedCard);
            state.cards.splice(action.selectedCardIndex, 1);
            action.updateOpponentsStatsOnBackend(action.updatedStats);
            return { ...state, cardChosen: true, stats: action.updatedStats, isValidCardToBuyArray: emptyArray, marketDemandMap: defaultMarketDemandMap };
        case 'SHOW_CARDS_TO_DISCARD':
            return { ...state, showCardToDiscardButton: false };
        case 'DISCARD_CARD':
            emptyArray = Array.apply(null, Array(state.isValidCardToBuyArray.length - 1)).map(function () {});

            delete state.showCardToDiscardButton;
            state.cards.splice(action.cardIndex, 1);
            return { ...state, cardChosen: true, isValidCardToBuyArray: emptyArray, marketDemandMap: defaultMarketDemandMap };
        case 'RE_RENDER_STATS':
            return { 
                ...state,
                statsReRendered: !state.statsReRendered, 
                stats: state.stats,  
                resourceSlashCards: state.resourceSlashCards
            };
        case 'SET_UPDATED_CARDS':
            return { ...state, cards: action.updatedCards, cardChosen: false  };
        case 'TOGGLE_SHOW_SLASH_CARD_RESOURCES':
            return { ...state, showSlashCardResources: !state.showSlashCardResources };
        case 'RESOURCE_SWITCHED':
            action.updateOpponentsStatsOnBackend(action.updatedStats);
            return { ...state, stats: action.updatedStats, resourceSlashCards: action.resourceSlashCards };
        case 'MARKET_RESOURCE_CHOSEN':
            action.updateOpponentsStatsOnBackend(action.updatedStats);
            return { ...state, stats: action.updatedStats, marketDemandMap: action.updatedMarketDemandMap, statsReRendered: !state.statsReRendered };
        default:
            return state;
    }
};

export default reducer;
