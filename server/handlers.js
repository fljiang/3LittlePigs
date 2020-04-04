module.exports = function (client, boardManager, cardManager) {
    function handleGetRandomBoard(callback) {
        if (boardManager.isGameFull()) {
            return callback('Selected game is full')
        }

        const board = boardManager.getRandomBoard(client.id)
        return callback(null, board)
    }

    function handleGetRandomCards(callback) {
        const cards = cardManager.getRandomCards(client.id)
        return callback(null, cards)
    }

    function handleSetSelectedCard({ selectedCard, selectedCardIndex }, callback) {
        const allCardsSetOrNot = cardManager.setSelectedCard(client.id, selectedCard, selectedCardIndex)
        return callback(null, allCardsSetOrNot)
    }

    function handleDisconnect() {
        boardManager.removeClient(client.id)
        cardManager.removeClient(client.id)
    }

    return {
        handleGetRandomBoard,
        handleGetRandomCards,
        handleSetSelectedCard,
        handleDisconnect
    }
}