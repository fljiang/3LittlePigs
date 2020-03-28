const reducer = (
    state = {},
    action
) => {
    switch (action.type) {
        case 'GET_CARDS':
            return { ...state, loading: true };
        case 'HIDE_CARDS':
            return { ...state, cards: null };
        case 'CARDS_RECEIVED':
            const emptyArray = Array.apply(null, Array(7)).map(function () {});
            return { ...state, loading: false, cards: action.json, isValidCardToBuyArray: emptyArray };
        case 'IS_VALID_CARD_TO_BUY_CALCULATED':
            state.isValidCardToBuyArray[action.cardIndex] = action.isValidCardToBuy;
            return { ...state };
        default:
            return state;
    }
};

export default reducer;