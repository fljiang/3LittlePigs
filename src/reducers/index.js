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
            return { ...state, loading: false, cards: action.json };
        default:
            return state;
    }
};

export default reducer;