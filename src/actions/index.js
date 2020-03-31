export const setCards = (cards) => ({
    type: 'SET_CARDS',
    cards
});

export const canBuyCard = (cost, cardIndex) => ({
    type: 'CAN_BUY_CARD',
    cost,
    cardIndex
});

export const startGame = (socket) => ({
    type: 'START_GAME',
    socket
});

export const setBoard = (randomBoard) => ({
    type: 'SET_BOARD',
    randomBoard
});