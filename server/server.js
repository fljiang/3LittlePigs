const server = require('http').createServer()
const io = require('socket.io')(server)

const BoardManager = require('./boardManager')
const makeHandlers = require('./handlers')

const boardManager = BoardManager()

io.on('connection', function (client) {
    const {
        handleGetRandomBoard
    } = makeHandlers(client, boardManager)

    console.log('client connected...', client.id)

    client.on('getRandomBoard', handleGetRandomBoard)

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