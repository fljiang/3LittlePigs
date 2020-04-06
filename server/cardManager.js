const cards_phase1 = require('./cards_phase1.json')

module.exports = function () {
    // Mapping of client IDs to client Objects
    let clientIdsToClientObjectsMap = new Map()
    // Mapping of players to an array of their cards from which to choose
    let clientIdsToCardsMap = new Map()
    // Mapping of players to an array of their selected cards
    let clientIdsToSelectedCardsMap = new Map()

    let remainingCards = cards_phase1.map(element => element)

    // Length each array in clientIdsToCardsMap must be to indicate 
    // that all players have selected/discarded their cards
    let cardsLengthToProceed = 6;
    
    function getRandomCards(client) {
        let cards = []

        for (let cardNum = 1; cardNum <= 7; cardNum++) {
            const randomNum = Math.floor((Math.random() * (22 - cardNum - (7 * clientIdsToCardsMap.size))))
            const randomCard = remainingCards[randomNum]
            remainingCards.splice(randomNum, 1)
            cards.push(randomCard)
    
            if (cardNum === 7) {
                clientIdsToClientObjectsMap.set(client.id, client)
                clientIdsToCardsMap.set(client.id, cards)
                return cards
            }
        }
    }

    function setSelectedCard(clientId, selectedCard, selectOrDiscard) {
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
        let allCardsSetOrNot = true
        if (clientIdsToCardsMap.size < 3) {
            allCardsSetOrNot = false
        }
        clientIdsToCardsMap.forEach(function (value, key) {
            if (value.length != cardsLengthToProceed) {
                allCardsSetOrNot = false
            }
        })

        // Broadcast to all players that all players have selected/discarded cards
        if (allCardsSetOrNot) {
            cardsLengthToProceed -= 1
            clientIdsToClientObjectsMap.forEach(function (value, key) {
                clientIdsToClientObjectsMap.get(key).emit('enableRevealCardsButton')
            })
        }
    }

    function removeClient(clientId) {
        remainingCards = remainingCards.concat(clientIdsToCardsMap.get(clientId))
        clientIdsToCardsMap.delete(clientId)
        clientIdsToSelectedCardsMap.delete(clientId)
        clientIdsToClientObjectsMap.delete(clientId)
    }

    return {
        getRandomCards,
        setSelectedCard,
        removeClient
    }
}