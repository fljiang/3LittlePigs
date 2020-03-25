const reducer = (
    state = {},
    action
) => {
    switch (action.type) {
        case 'HIDE_CARDS':
            return { ...state, cards: null };
        case 'CARDS_RECEIVED':
            return { ...state, cards: action.json };
        default:
            return state;
    }
};

export default reducer;