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

    function setSelectedCard(clientId, selectedCard, selectedCardIndex) {
        if (selectedCard != null) {
            let selectedCards = [];
            if (clientIdsToSelectedCardsMap.clientId != null) {
                selectedCards = clientIdsToSelectedCardsMap.get(clientId)
            }
            selectedCards.push(selectedCard)
            clientIdsToSelectedCardsMap.set(clientId, selectedCards)
        }
        let currentCards = clientIdsToCardsMap.get(clientId)
        currentCards.splice(selectedCardIndex, 1)
        clientIdsToCardsMap.set(currentCards)

        clientIdsToCardsMap.map(element =>
            Object.keys(element).map(function(key, index) {
                if (element[key].length != cardsLengthToProceed) {
                    return false
                }
            })   
        )
        return true
    }

    function removeClient(clientId) {
        remainingCards = remainingCards.concat(clientIdsToCardsMap.get(clientId))
        clientIdsToCardsMap.delete(clientId)
    }

    return {
        getRandomCards,
        setSelectedCard,
        removeClient
    }
}