const reducer = (
    state = {},
    action
) => {
    switch (action.type) {
        case 'SET_CARDS':
            return { ...state, loading: true };
        case 'CARDS_SET':
            const emptyArray = Array.apply(null, Array(7)).map(function () {});
            return { 
                ...state, 
                loading: false, 
                cards: action.cards,
                isValidCardToBuyArray: emptyArray,
                stats: {
                    "Coin": 3,
                    "Victory": 0,
                    "Brick": 0,
                    "Stick": 0,
                    "Mud": 0,
                    "Stone": 0,
                    "Apple": 0,
                    "Water": 0,
                    "Flower": 0,
                    "Wolf": 0,
                    "Glass": 0,
                    "Pot": 0,
                    "Spoon": 0
                }
            };
        case 'IS_VALID_CARD_TO_BUY_CALCULATED':
            state.isValidCardToBuyArray[action.cardIndex] = action.isValidCardToBuy;
            return { ...state };
        default:
            return state;
    }
};

export default reducer;
