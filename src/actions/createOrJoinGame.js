export const joinGame = () => ({
    type: 'LAUNCH_GAME'
})

// Async Action Items Using Socket.io

export const createGame = (socket) => ({
    return (_) {
        socket.emit('createGame')
    }
})

export const launchGame = (socket, gameCode) => ({
    return (_) {
        let postData = {
            gameCode
        }
        socket.emit('launchGame', postData)
    }
})