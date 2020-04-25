module.exports = function (client, gameManager, boardManager, cardManager, statsManager) {
    function handleStartGame(callback) {
        const gameCode = gameManager.startGame(client.id)
        return callback(null, gameCode)
    }

    function handleJoinGame({ gameCode }, callback) {
        if (boardManager.isGameFull(gameCode)) {
            return callback('Cannot join game - game is full')
        }

        const gameCodeResultFromManager = gameManager.joinGame(client.id, gameCode)
        if (gameCodeResultFromManager != null) {
            return callback(null, gameCode)
        } else {
            return callback('Cannot join game - invalid game code')
        }
    }

    function handleGetRandomBoard(callback) {
        const gameCode = gameManager.getGameCodeOfClient(client.id)
        
        const board = boardManager.getRandomBoard(client.id, gameCode)
        return callback(null, board)
    }

    function handleGetRandomCards(callback) {
        const gameCode = gameManager.getGameCodeOfClient(client.id)
        const clientIdsForGame = gameManager.getClientIdsForGame(gameCode)

        const cards = cardManager.getRandomCards(client, gameCode, clientIdsForGame)
        return callback(null, cards)
    }

    function handleInitializeStats({ gameCode }) {
        statsManager.initializeStats(client)

        let clientIds = gameManager.getClientIdsForGame(gameCode)
        let boards = boardManager.getBoardsForGameCode(gameCode)
        clientIds.map(clientId => {
                let board = boards.get(clientId)
                let updatedStats = {
                    "Coin": 3,
                    "Victory": 0,
                    "Brick": board === "Brick" ? 1 : 0,
                    "Stick": board === "Stick" ? 1 : 0,
                    "Mud": board === "Mud" ? 1 : 0,
                    "Stone": 0,
                    "Apple": 0,
                    "Water": 0,
                    "Flower": 0,
                    "Wolf": 0,
                    "Glass": 0,
                    "Pot": 0,
                    "Spoon": 0
                }
                console.log(board)
                console.log(clientId)
                console.log(updatedStats)
                console.log(gameCode)
                statsManager.updateOpponentsStats(clientId, board, updatedStats, gameCode)
            })
    }

    function handleSetSelectedCard({ selectedCard, selectOrDiscard }) {
        const gameCode = gameManager.getGameCodeOfClient(client.id)
        const clientIdsForGame = gameManager.getClientIdsForGame(gameCode)

        cardManager.setSelectedCard(client.id, selectedCard, selectOrDiscard, gameCode, clientIdsForGame)
    }

    function handleUpdateOpponentsStats({ board, updatedStats }) {
        const gameCode = gameManager.getGameCodeOfClient(client.id)
        statsManager.updateOpponentsStats(client.id, board, updatedStats, gameCode)
    }

    function handleDisconnect() {
        const gameCode = gameManager.getGameCodeOfClient(client.id)
        const board = boardManager.removeClient(client.id, gameCode)

        gameManager.removeClient(client.id, gameCode)
        statsManager.removeClient(client.id, board, gameCode)

        const clientIdsForGame = gameManager.getClientIdsForGame(gameCode)
        cardManager.removeClient(client.id, gameCode, clientIdsForGame)
    }

    return {
        handleStartGame,
        handleJoinGame,
        handleGetRandomBoard,
        handleGetRandomCards,
        handleInitializeStats,
        handleSetSelectedCard,
        handleUpdateOpponentsStats,
        handleDisconnect
    }
}