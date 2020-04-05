const io = require('socket.io-client')

export default function () {
    const socket = io.connect('http://localhost:3000')
  
    socket.on('error', function (err) {
        console.log('received socket error:')
        console.log(err)
    })

    function getRandomBoard(callback) {
        socket.emit('getRandomBoard', callback)
    }

    function getRandomCards(callback) {
        socket.emit('getRandomCards', callback)
    }

    function setSelectedCard(callback, selectedCard, selectOrDiscard) {
        socket.emit('setSelectedCard', { selectedCard, selectOrDiscard }, callback)
    }
  
    return {
        getRandomBoard,
        getRandomCards,
        setSelectedCard
    }
}