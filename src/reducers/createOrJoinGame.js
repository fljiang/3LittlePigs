const createOrJoinGameReducer = (
    state = {},
    action
) => {
    switch (action.type) {
        case 'JOIN_GAME':
            return { ...state, expectingGameCode: true }
    }
}

export default createOrJoinGameReducer