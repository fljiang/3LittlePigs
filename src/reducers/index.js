const reducer = (
    state = {},
    action
) => {
    switch (action.type) {
        case 'GET_CARDS':
            return { ...state, loading: true };
        case 'CARDS_RECEIVED':
            return { ...state, cards: action.json[0], loading: false }
        default:
            return state;
    }
};

export default reducer;