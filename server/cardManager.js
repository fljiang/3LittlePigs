const cardsPhase1 = require('./cardsPhase1.json')

module.exports = function () {
    // Mapping of games to the remaining cards
    let gamesToRemainingCardsMap = new Map()
    // Mapping of games to the number of cards not selected/discarded per player to proceed
    let gamesToCardsLengthToProceed = new Map()
    // List of client IDs
    let clientIds = []
    // Mapping of client IDs to client Objects
    let clientIdsToClientObjectsMap = new Map()
    // Mapping of players to an array of their cards from which to choose
    let clientIdsToCardsMap = new Map()
    // Mapping of players to an array of their selected cards
    let clientIdsToSelectedCardsMap = new Map()
    
    function getRandomCards(client, gameCode, clientIdsForGame) {
        let cards = []

        let remainingCards = gamesToRemainingCardsMap.get(gameCode)
        if (gamesToRemainingCardsMap.get(gameCode) == null) {
            remainingCards = cardsPhase1.map(element => element)
            gamesToRemainingCardsMap.set(gameCode, remainingCards)
            gamesToCardsLengthToProceed.set(gameCode, 6)
        }

        for (let cardNum = 1; cardNum <= 7; cardNum++) {
            const randomNum = Math.floor((Math.random() * remainingCards.length))
            const randomCard = remainingCards[randomNum]
            remainingCards.splice(randomNum, 1)
            cards.push(randomCard)
    
            if (cardNum === 7) {
                clientIds.push(client.id)
                clientIdsToClientObjectsMap.set(client.id, client)
                clientIdsToCardsMap.set(client.id, cards)
                gamesToRemainingCardsMap.set(gameCode, remainingCards)
                enableViewCardsButtonOrNot(gameCode, clientIdsForGame)
                return cards
            }
        }
    }

    function setSelectedCard(clientId, selectedCard, selectOrDiscard, gameCode, clientIdsForGame) {
        // Add selected card to clientIdsToSelectedCardsMap (if player didn't choose "Pass")
        if (selectOrDiscard === "select") {
            let selectedCards = [];
            if (clientIdsToSelectedCardsMap.clientId != null) {
                selectedCards = clientIdsToSelectedCardsMap.get(clientId)
            }
            selectedCards.push(selectedCard)
            clientIdsToSelectedCardsMap.set(clientId, selectedCards)
        }

        // Remove selected card from clientIdsToCardsMap
        let currentCards = clientIdsToCardsMap.get(clientId)
        let cardToRemoveIndex = 0
        currentCards.forEach(function (item, index) {
            if (item.description === selectedCard.description) {
                cardToRemoveIndex = index
            }
        })
        currentCards.splice(cardToRemoveIndex, 1)
        clientIdsToCardsMap.set(clientId, currentCards)

        // Determine whether or not all players have selected/discarded cards
        let allCardsSetOrNot = gamesToRemainingCardsMap.get(gameCode).length === 0
        let cardsLengthToProceed = gamesToCardsLengthToProceed.get(gameCode)
        clientIdsForGame.forEach(function (item, index) {
            if (clientIdsToCardsMap.get(item).length != cardsLengthToProceed) {
                allCardsSetOrNot = false
            }
        })

        // Broadcast to all players that all players have selected/discarded cards
        if (allCardsSetOrNot) {
            cardsLengthToProceed -= 1
            gamesToCardsLengthToProceed.set(gameCode, cardsLengthToProceed)
            rotateCards(clientIdsForGame)
            clientIdsForGame.forEach(function (item, index) {
                clientIdsToClientObjectsMap.get(item).emit('enableRevealCardsButton')
            })
        }
    }

    function enableViewCardsButtonOrNot(gameCode, clientIdsForGame) {
        if (gamesToRemainingCardsMap.get(gameCode).length === 0) {
            clientIdsForGame.forEach(function (item, index) {
                clientIdsToClientObjectsMap.get(item).emit('enableViewCardsButton')
            })
        }
    }

    function rotateCards(clientIdsForGame) {
        const lastClientId = clientIdsForGame[2]
        let lastCards = clientIdsToCardsMap.get(lastClientId)
        clientIdsForGame.forEach(function (item, index) {
            tempLastCards = clientIdsToCardsMap.get(item)
            clientIdsToCardsMap.set(item, lastCards)
            lastCards = tempLastCards
        })

        clientIdsForGame.forEach(function (item, index) {
            clientIdsToClientObjectsMap.get(item).emit(
                'rotateCards', 
                clientIdsToCardsMap.get(item)
            )
        })
    }

    function removeClient(clientId, gameCode, clientIdsForGame) {
        clientIdsToCardsMap.delete(clientId)
        clientIdsToSelectedCardsMap.delete(clientId)
        clientIdsToClientObjectsMap.delete(clientId)

        let clientIdIndex = 0
        clientIds.forEach(function (item, index) {
            if (item === clientId) {
                clientIdIndex = index
            }
        })
        clientIds.splice(clientIdIndex, 1)

        if (clientIdsForGame.size === 0) {
            gamesToRemainingCardsMap.delete(gameCode)
            gamesToCardsLengthToProceed.delete(gameCode)
        }
    }

    return {
        getRandomCards,
        setSelectedCard,
        removeClient
    }
}