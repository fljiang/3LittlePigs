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
});

export const discardCard = (cardIndex) => ({
    type: 'DISCARD_CARD',
    cardIndex
});

export const reRenderStats = () => ({
    type: 'RE_RENDER_STATS'
});

export const setUpdatedCards = (updatedCards) => ({
    type: 'SET_UPDATED_CARDS',
    updatedCards
});

export const toggleShowSlashCardResources = () => ({
    type: 'TOGGLE_SHOW_SLASH_CARD_RESOURCES'
});

export const switchResources = (cardDescription, newResource, updateOpponentsStatsOnBackend) => ({
    type: 'SWITCH_RESOURCES',
    cardDescription,
    newResource,
    updateOpponentsStatsOnBackend
});

export const marketClick = (resource, secondaryResourceStat, tertiaryResourceStat, updateOpponentsStatsOnBackend) => ({
    type: 'MARKET_CLICK',
    resource,
    secondaryResourceStat,
    tertiaryResourceStat,
    updateOpponentsStatsOnBackend
});
