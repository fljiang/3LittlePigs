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

export const showCardsToDiscard = () => ({
    type: 'SHOW_CARDS_TO_DISCARD'
})

export const discardCard = () => ({
    type: 'DISCARD_CARD'
})

export const reRenderStats = () => ({
    type: 'RE_RENDER_STATS'
})