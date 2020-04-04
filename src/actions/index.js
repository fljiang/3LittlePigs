export const setCards = (board, cards) => ({
    type: 'SET_CARDS',
    board,
    cards
});

export const canBuyCard = (cost, cardIndex) => ({
    type: 'CAN_BUY_CARD',
    cost,
    cardIndex
});

export const pass = () => ({
    type: 'PASS'
});

export const chooseCard = (cost, cardIndex) => ({
    type: 'CHOOSE_CARD',
    cost,
    cardIndex
});

export const reRenderStats = () => ({
    type: 'RE_RENDER_STATS'
})