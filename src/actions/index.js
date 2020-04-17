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

export const canBuyResource = (cost, resourceIndex) => ({
    type: 'CAN_BUY_RESOURCE',
    cost,
    resourceIndex
});

export const pass = (updateOpponentsStatsOnBackend) => ({
    type: 'PASS',
    updateOpponentsStatsOnBackend
});

export const chooseCard = (card, cardIndex, setSelectedCardOnBackend, updateOpponentsStatsOnBackend) => ({
    type: 'CHOOSE_CARD',
    card,
    cardIndex,
    setSelectedCardOnBackend,
    updateOpponentsStatsOnBackend
});

export const showCardsToDiscard = () => ({
    type: 'SHOW_CARDS_TO_DISCARD'
})

export const discardCard = (cardIndex) => ({
    type: 'DISCARD_CARD',
    cardIndex
})

export const reRenderStats = () => ({
    type: 'RE_RENDER_STATS'
})

export const setUpdatedCards = (updatedCards) => ({
    type: 'SET_UPDATED_CARDS',
    updatedCards
})

export const toggleShowSlashCardResources = () => ({
    type: 'TOGGLE_SHOW_SLASH_CARD_RESOURCES'
})
<<<<<<< HEAD
=======

export const switchResources = (cardDescription, newResource, updateOpponentsStatsOnBackend) => ({
    type: 'SWITCH_RESOURCES',
    cardDescription,
    newResource,
    updateOpponentsStatsOnBackend
})
>>>>>>> e38f405740b81b8a2a71e59141ab5037ac3f5527
