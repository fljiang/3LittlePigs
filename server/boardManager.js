module.exports = function () {
    // Mapping of players to their boards (boards defined by their primary resources)
    let clientIdsToBoardsMap = new Map()

    let remainingBoards = ["Stick", "Brick", "Mud"]

    function isGameFull() {
        return remainingBoards.length == 0
    }

    function getRandomBoard(clientId) {
        const numRemainingBoards = 3 - clientIdsToBoardsMap.size
        const randomBoardIndex = Math.floor((Math.random() * numRemainingBoards))
        const randomBoard = remainingBoards[randomBoardIndex]
        
        remainingBoards.splice(randomBoardIndex, 1)
        clientIdsToBoardsMap.set(clientId, randomBoard)

        return randomBoard
    }

    function removeClient(clientId) {
        const board = clientIdsToBoardsMap.get(clientId)
        clientIdsToBoardsMap.delete(clientId)
        return board
    }

    return {
        isGameFull,
        getRandomBoard,
        removeClient
    }
}