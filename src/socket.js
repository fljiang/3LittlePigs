const io = require('socket.io-client')

export default function (
    updateOpponentsStatsUI,
    setEnableViewCardsButton, 
    setEnableRevealCardsButton,
    updateCardsAfterRotation
) {
    const socket = io.connect('http://localhost:3000')
  
    socket.on('error', function (err) {
        console.log('received socket error:')
        console.log(err)
    })

    socket.on('updateOpponentsStatsUI', function (data) {
        updateOpponentsStatsUI(data.board, data.updatedStats)
    })

    socket.on('rotateCards', function (updatedCards) {
        updateCardsAfterRotation(updatedCards)
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

    function initializeStats(gameCode) {
        socket.emit('initializeStats', { gameCode })
    }

    function setSelectedCard(selectedCard, selectOrDiscard, opponentsToChooseFrom) {
        socket.emit('setSelectedCard', { selectedCard, selectOrDiscard, opponentsToChooseFrom })
    }

    function updateOpponentsStats(board, updatedStats) {
        socket.emit('updateOpponentsStats', { board, updatedStats })
    }

    function enableRevealCardsButtonOrNot() {
        socket.emit('enableRevealCardsButtonOrNot')
    }
  
    return {
        getRandomBoard,
        getRandomCards,
        initializeStats,
        setSelectedCard,
        updateOpponentsStats,
        registerEnableViewCardsButtonHandler,
        unregisterEnableViewCardsButtonHandler,
        registerEnableRevealCardsButtonHandler,
        unregisterEnableRevealCardsButtonHandler,
        enableRevealCardsButtonOrNot
    }
}