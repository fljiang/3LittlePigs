module.exports = function (client, boardManager) {
    function handleGetRandomBoard(callback) {
        if (boardManager.isGameFull()) {
            return callback('Selected game is full')
        }

        const board = boardManager.getRandomBoard(client.id)
        return callback(null, board)
    }

    function handleDisconnect() {
        boardManager.removeClient(client.id)
    }

    return {
        handleGetRandomBoard,
        handleDisconnect
    }
}