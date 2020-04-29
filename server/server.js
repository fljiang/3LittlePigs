const server = require('http').createServer()
const io = require('socket.io')(server)

const GameManager = require('./gameManager')
const BoardManager = require('./boardManager')
const CardManager = require('./cardManager')
const StatsManager = require('./statsManager')
const makeHandlers = require('./handlers')

const gameManager = GameManager()
const boardManager = BoardManager()
const cardManager = CardManager()
const statsManager = StatsManager()

io.on('connection', function (client) {
    const {
        handleStartGame,
        handleJoinGame,
        handleGetRandomBoard,
        handleGetRandomCards,
        handleInitializeStats,
        handleSetSelectedCard,
        handleUpdateOpponentsStats,
        handleEnableRevealCardsButtonOrNot,
        handleDisconnect
    } = makeHandlers(client, gameManager, boardManager, cardManager, statsManager)

    console.log('client connected...', client.id)

    client.on('startGame', handleStartGame)

    client.on('joinGame', handleJoinGame)

    client.on('getRandomBoard', handleGetRandomBoard)

    client.on('getRandomCards', handleGetRandomCards)

    client.on('initializeStats', handleInitializeStats)

    client.on('setSelectedCard', handleSetSelectedCard)

    client.on('updateOpponentsStats', handleUpdateOpponentsStats)

    client.on('enableRevealCardsButtonOrNot', handleEnableRevealCardsButtonOrNot)

    client.on('disconnect', function () {
        console.log('client disconnect...', client.id)
        handleDisconnect()
    })

    client.on('error', function (err) {
        console.log('received error from client:', client.id)
        console.log(err)
    })
})

server.listen(3000, function (err) {
    if (err) throw err
    console.log('listening on port 3000')
})