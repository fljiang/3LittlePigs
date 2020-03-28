const reducer = (
    state = {},
    action
) => {
    switch (action.type) {
        case 'GET_CARDS':
            return { ...state, loading: true };
        case 'CARDS_RECEIVED':
            const emptyArray = Array.apply(null, Array(7)).map(function () {});
            return { 
                ...state, 
                loading: false, 
                cards: action.json, 
                isValidCardToBuyArray: emptyArray,
                stats: {
                    "Coin": 3,
                    "Brick": 0,
                    "Stick": 0,
                    "Mud": 0,
                    "Stone": 0,
                    "Apple": 0,
                    "Water": 0,
                    "Flower": 0,
                    "Wolf": 0
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