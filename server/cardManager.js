const cards_phase1 = require('./cards_phase1.json')

module.exports = function () {
    // Mapping of players to an array of their cards from which to choose
    let clientIdsToCardsMap = new Map()
    // Mapping of players to an array of their selected cards
    let clientIdsToSelectedCardsMap = new Map()

    let remainingCards = cards_phase1.map(element => element)

    // Length each array in clientIdsToCardsMap must be to indicate 
    // that all players have selected/discarded their cards
    let cardsLengthToProceed = 4;
    
    function getRandomCards(clientId) {
        let cards = []

        for (let cardNum = 1; cardNum <= 5; cardNum++) {
            const randomNum = Math.floor((Math.random() * (18 - cardNum - (5 * clientIdsToCardsMap.size))))
            const randomCard = remainingCards[randomNum]
            remainingCards.splice(randomNum, 1)
            cards.push(randomCard)
    
            if (cardNum === 5) {
                clientIdsToCardsMap.set(clientId, cards)
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
        if (clientIdsToCardsMap.size < 3) {
            return false
        }
        clientIdsToCardsMap.forEach(function (value, key) {
            if (value.length != cardsLengthToProceed) {
                return false
            }
        })
        cardsLengthToProceed -= 1
        return true
    }

    function removeClient(clientId) {
        remainingCards = remainingCards.concat(clientIdsToCardsMap.get(clientId))
        clientIdsToCardsMap.delete(clientId)
        clientIdsToSelectedCardsMap.delete(clientId)
    }

    return {
        getRandomCards,
        setSelectedCard,
        removeClient
    }
}