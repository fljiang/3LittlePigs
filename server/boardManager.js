module.exports = function () {
    // Mapping of players to their boards (boards defined by their primary resources)
    let clientIdsToBoardsMap = new Map()

    let remainingBoards = ["Stick", "Brick", "Mud"]

    function isGameFull() {
        return clientIdsToBoardsMap.size >= 3
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
        remainingBoards.push(clientIdsToBoardsMap.get(clientId))
        clientIdsToBoardsMap.delete(clientId)
    }

    return {
        isGameFull,
        getRandomBoard,
        removeClient
    }
}