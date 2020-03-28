export const getCards = () => ({
    type: 'GET_CARDS',
});

export const hideCards = () => ({
    type: 'HIDE_CARDS',
});

export const canBuyCard = (cost, cardIndex) => ({
    type: 'CAN_BUY_CARD',
    cost,
    cardIndex
});