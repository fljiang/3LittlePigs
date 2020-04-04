export const setCards = (cards) => ({
    type: 'SET_CARDS',
    cards
});

export const canBuyCard = (cost, cardIndex) => ({
    type: 'CAN_BUY_CARD',
    cost,
    cardIndex
});

export const pass = () => ({
    type: 'PASS'
})