module.exports = function () {
    // Mapping of players to their games
    let clientIdsToGamesMap = new Map()
    // Mapping of games to their players
    let gamesToClientIdsMap = new Map()

    function startGame(clientId) {
        let gameCode = getNewGameCode()
        while (gamesToClientIdsMap.get(gameCode) != null) {
            gameCode = getNewGameCode()
        }

        clientIdsToGamesMap.set(clientId, gameCode)
        let clientIds = []
        clientIds.push(clientId)
        gamesToClientIdsMap.set(gameCode, clientIds)

        return gameCode;
    }

    function getNewGameCode() {
        let gameCodeLength = 5
        let gameCode = ""
        let charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
        let charsetLength = charset.length

        for (let i = 0; i < gameCodeLength; ++i) {
            gameCode += charset.charAt(Math.floor(Math.random() * (charsetLength + 1)))
        }
        return gameCode
    }

    function joinGame(clientId, gameCode) {
        let updatedClientIds = gamesToClientIdsMap.get(gameCode)
        if (updatedClientIds != null) {
            clientIdsToGamesMap.set(clientId, gameCode)
            updatedClientIds.push(clientId)
            gamesToClientIdsMap.set(gameCode, updatedClientIds)
            return gameCode
        }
        return null
    }

    function getGameCodeOfClient(clientId) {
        return clientIdsToGamesMap.get(clientId)
    }

    function getClientIdsForGame(gameCode) {
        return gamesToClientIdsMap.get(gameCode)
    }

    function removeClient(clientId, gameCode) {
        clientIdsToGamesMap.delete(clientId)

        let updatedClientIds = gamesToClientIdsMap.get(gameCode)

        if (updatedClientIds != null) {
            const clientIdIndex = updatedClientIds.indexOf(clientId)
            if (clientIdIndex !== -1) {
                updatedClientIds.splice(clientIdIndex, 1)
                if (updatedClientIds.size === 0) {
                    gamesToClientIdsMap.delete(gameCode)
                } else {
                    gamesToClientIdsMap.set(gameCode, updatedClientIds)
                }
            }
        }
    }

    return {
        startGame,
        joinGame,
        getGameCodeOfClient,
        getClientIdsForGame,
        removeClient
    }
}