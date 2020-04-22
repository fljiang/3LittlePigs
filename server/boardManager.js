module.exports = function () {
    // Mapping of games to a mapping of their clients to their boards (boards defined by their primary resources)
    let gamesToBoardsMap = new Map()
    // Mapping of games to a mapping of their remaining boards
    let gamesToRemainingBoardsMap = new Map()

    function isGameFull(gameCode) {
        return gamesToBoardsMap.get(gameCode) != null && gamesToBoardsMap.get(gameCode).length === 3
    }

    function getRandomBoard(clientId, gameCode) {
        if (gamesToRemainingBoardsMap.get(gameCode) == null) {
            gamesToRemainingBoardsMap.set(gameCode, ["Stick", "Brick", "Mud"])
            gamesToBoardsMap.set(gameCode, new Map())
        }

        let updatedRemainingBoards= gamesToRemainingBoardsMap.get(gameCode)
        const numRemainingBoards = updatedRemainingBoards.length
        const randomBoardIndex = Math.floor((Math.random() * numRemainingBoards))
        const randomBoard = updatedRemainingBoards[randomBoardIndex]

        updatedRemainingBoards.splice(randomBoardIndex, 1)
        gamesToRemainingBoardsMap.set(gameCode, updatedRemainingBoards)
        let updatedBoards = gamesToBoardsMap.get(gameCode)
        updatedBoards.set(clientId, randomBoard)
        gamesToBoardsMap.set(gameCode, updatedBoards)

        return randomBoard
    }

    function removeClient(clientId, gameCode) {
        let updatedBoards = gamesToBoardsMap.get(gameCode)

        if (updatedBoards != null) {
            const board = updatedBoards.get(clientId)
            if (board != null) {
                updatedBoards.delete(clientId)
                gamesToBoardsMap.set(gameCode, updatedBoards)

                if (updatedBoards.length === 0) {
                    gamesToBoardsMap.delete(gameCode)
                    gamesToRemainingBoardsMap.delete(gameCode)
                }
                return board
            }
        }
    }

    return {
        isGameFull,
        getRandomBoard,
        removeClient
    }
}