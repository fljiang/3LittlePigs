const io = require('socket.io-client')

export default function (setEnableViewCardsButton, setEnableRevealCardsButton) {
    const socket = io.connect('http://localhost:3000')
  
    socket.on('error', function (err) {
        console.log('received socket error:')
        console.log(err)
    })

    function registerEnableViewCardsButtonHandler() {
        socket.on('enableViewCardsButton', function () {
            setEnableViewCardsButton()
        })
    }

    function unregisterEnableViewCardsButtonHandler() {
        socket.off('enableViewCardsButton')
    }

    function registerEnableRevealCardsButtonHandler() {
        socket.on('enableRevealCardsButton', function () {
            setEnableRevealCardsButton()
        })
    }

    function unregisterEnableRevealCardsButtonHandler() {
        socket.off('enableRevealCardsButton')
    }

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
        setSelectedCard,
        registerEnableViewCardsButtonHandler,
        unregisterEnableViewCardsButtonHandler,
        registerEnableRevealCardsButtonHandler,
        unregisterEnableRevealCardsButtonHandler
    }
}