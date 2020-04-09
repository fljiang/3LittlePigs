module.exports = function () {
    // Mapping of client IDs to client Objects
    let clientIdsToClientObjectsMap = new Map()
    // Mapping of board (by resources) to an array of their stats
    let boardResourcesToStatsMap = new Map()

    function initializeStats(client) {
        clientIdsToClientObjectsMap.set(client.id, client)
    }

    function updateOpponentsStats(client, board, updatedStats) {
        boardResourcesToStatsMap.set(board, updatedStats)
        clientIdsToClientObjectsMap.forEach(function (value, key) {
            if (client.id != key) {
                clientIdsToClientObjectsMap.get(key).emit('updateOpponentsStatsUI', { board, updatedStats })
            }
        })
    }

    function removeClient(board) {
        boardResourcesToStatsMap.delete(board)
    }

    return {
        initializeStats,
        updateOpponentsStats,
        removeClient
    }
}