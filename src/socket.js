const io = require('socket.io-client')

export default function (setEnableRevealCardsButton) {
    const socket = io.connect('http://localhost:3000')
  
    socket.on('error', function (err) {
        console.log('received socket error:')
        console.log(err)
    })

    socket.on('enableRevealCardsButton', function () {
        setEnableRevealCardsButton()
    })

    function getRandomBoard(callback) {
        socket.emit('getRandomBoard', callback)
    }

    function getRandomCards(callback) {
        socket.emit('getRandomCards', callback)
    }

    function setSelectedCard(selectedCard, selectOrDiscard) {
        socket.emit('setSelectedCard', { selectedCard, selectOrDiscard })
    }
  
    return {
        getRandomBoard,
        getRandomCards,
        setSelectedCard
    }
}