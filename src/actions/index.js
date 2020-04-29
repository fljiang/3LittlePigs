export const setGameToJoin = () => ({
    type: 'SET_GAME_TO_JOIN'
})

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

export const chooseCard = (
    card, 
    cardIndex, 
    setSelectedCardOnBackend, 
    chooseOpponentToBuyFrom,
    updateOpponentsStatsOnBackend
) => ({
    type: 'CHOOSE_CARD',
    card,
    cardIndex,
    setSelectedCardOnBackend,
    chooseOpponentToBuyFrom,
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

export const calculateIsValidResourceToBuyMap = (
    resource,
    secondaryOpponentsStats, 
    tertiaryOpponentsStats, 
    updateOpponentsStatsOnBackend
) => ({
    type: 'CALCULATE_IS_VALID_RESOURCE_TO_BUY_MAP',
    resource,
    secondaryOpponentsStats,
    tertiaryOpponentsStats,
    updateOpponentsStatsOnBackend
});

export const updateMarket = () => ({
    type: 'UPDATE_MARKET'
})

export const marketClick = (
    resource, 
    secondaryBoardResource,
    secondaryOpponentsStats, 
    tertiaryBoardResource,
    tertiaryOpponentsStats, 
    updateOpponentsStatsOnBackend
) => ({
    type: 'MARKET_CLICK',
    resource,
    secondaryBoardResource,
    secondaryOpponentsStats,
    tertiaryBoardResource,
    tertiaryOpponentsStats,
    updateOpponentsStatsOnBackend
});
