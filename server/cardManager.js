const cards_phase1 = require('./cards_phase1.json')

module.exports = function () {
    // Mapping of players to an array of their cards
    let clientIdsToCardsMap = new Map()

    let remainingCards = cards_phase1.map(element => element)
    
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

    function removeClient(clientId) {
        remainingCards = remainingCards.concat(clientIdsToCardsMap.get(clientId))
        clientIdsToCardsMap.delete(clientId)
    }

    return {
        getRandomCards,
        removeClient
    }
}