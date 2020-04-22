module.exports = function () {
    // Mapping of client IDs to client Objects
    let clientIdsToClientObjectsMap = new Map()
    // Mapping of games to mapping of board (by resources) to an array of their stats
    let gamesToStatsMap = new Map()

    function initializeStats(client) {
        clientIdsToClientObjectsMap.set(client.id, client)
    }

    function updateOpponentsStats(client, board, updatedStats, gameCode) {
        let boardResourcesToStatsMap = gamesToStatsMap.get(gameCode)
        if (boardResourcesToStatsMap == null) {
            boardResourcesToStatsMap = new Map()
        }
        boardResourcesToStatsMap.set(board, updatedStats)
        gamesToStatsMap.set(gameCode, boardResourcesToStatsMap)
        
        clientIdsToClientObjectsMap.forEach(function (value, key) {
            if (client.id != key) {
                clientIdsToClientObjectsMap.get(key).emit('updateOpponentsStatsUI', { board, updatedStats })
            }
        })
    }

    function removeClient(clientId, board, gameCode) {
        let boardResourcesToStatsMap = gamesToStatsMap.get(gameCode)
        if (boardResourcesToStatsMap != null) {
            boardResourcesToStatsMap.delete(board)
            if (boardResourcesToStatsMap.size === 0) {
                gamesToStatsMap.delete(gameCode)
            } else {
                gamesToStatsMap.set(gameCode, boardResourcesToStatsMap)
            }
        }
        clientIdsToClientObjectsMap.delete(clientId)
    }

    return {
        initializeStats,
        updateOpponentsStats,
        removeClient
    }
}