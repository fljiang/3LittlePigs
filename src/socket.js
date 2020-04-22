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

    function startGame(callback) {
        socket.emit('startGame', callback)
    }

    function joinGame(callback, gameCode) {
        socket.emit('joinGame', callback, { gameCode })
    }

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

    function initializeStats() {
        socket.emit('initializeStats')
    }

    function setSelectedCard(selectedCard, selectOrDiscard) {
        socket.emit('setSelectedCard', { selectedCard, selectOrDiscard })
    }

    function updateOpponentsStats(board, updatedStats) {
        socket.emit('updateOpponentsStats', { board, updatedStats })
    }
  
    return {
        startGame,
        joinGame,
        getRandomBoard,
        getRandomCards,
        initializeStats,
        setSelectedCard,
        updateOpponentsStats,
        registerEnableViewCardsButtonHandler,
        unregisterEnableViewCardsButtonHandler,
        registerEnableRevealCardsButtonHandler,
        unregisterEnableRevealCardsButtonHandler
    }
}