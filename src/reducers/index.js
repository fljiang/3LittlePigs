const reducer = (
    state = {},
    action
) => {
    switch (action.type) {
        case 'GET_CARDS':
            return { ...state, cards: true };
        case 'HIDE_CARDS':
            return { ...state, cards: false };
        default:
            return state;
    }
};

export default reducer;