module.exports = function () {
    // Mapping of players to their boards (boards defined by their primary resources)
    const clientIdsToBoardsMap = new Map()

    const remainingBoards = ["stick", "brick", "mud"]

    function isGameFull() {
        return boards.size >= 3
    }

    function getRandomBoard(clientId) {
        const numRemainingBoards = 3 - boards.size
        const randomBoardIndex = Math.floor((Math.random() * numRemainingBoards))
        const randomBoard = remainingBoards[randomBoardIndex]
        
        remainingBoards.splice(randomBoardIndex, 1)
        clientIdsToBoardsMap.set(clientId, randomBoard)

        return randomBoard
    }

    return {
        isGameFull,
        getRandomBoard
    }
}