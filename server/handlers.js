module.exports = function (client, boardManager, cardManager, statsManager) {
    function handleGetRandomBoard(callback) {
        if (boardManager.isGameFull()) {
            return callback('Selected game is full')
        }

        const board = boardManager.getRandomBoard(client.id)
        return callback(null, board)
    }

    function handleGetRandomCards(callback) {
        const cards = cardManager.getRandomCards(client)
        return callback(null, cards)
    }

    function handleInitializeStats() {
        statsManager.initializeStats(client)
    }

    function handleSetSelectedCard({ selectedCard, selectOrDiscard }) {
        cardManager.setSelectedCard(client.id, selectedCard, selectOrDiscard)
    }

    function handleUpdateOpponentsStats({ board, updatedStats }) {
        statsManager.updateOpponentsStats(client, board, updatedStats)
    }

    function handleDisconnect() {
        const board = boardManager.removeClient(client.id)
        cardManager.removeClient(client.id)
        statsManager.removeClient(client.id, board)
    }

    return {
        handleGetRandomBoard,
        handleGetRandomCards,
        handleInitializeStats,
        handleSetSelectedCard,
        handleUpdateOpponentsStats,
        handleDisconnect
    }
}