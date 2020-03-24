const reducer = (
    state = {},
    action
) => {
    switch (action.type) {
        case 'GET_CARDS':
            return { ...state, cards: true };
        default:
            return state;
    }
};

export default reducer;