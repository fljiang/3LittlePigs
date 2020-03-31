const cards_phase1 = require('./cards_phase1.json')

module.exports = function () {
    // Mapping of players to an array of their cards
    const clientIdsToCardsMap = new Map()

    let remainingCards = cards_phase1.map(element => element)
    
    function getRandomCards(clientId) {
        let cards = []

        for (let cardNum = 1; cardNum <= 4; cardNum++) {
            let randomNum = Math.floor((Math.random() * (15 - cardNum - (4 * clientIdsToCardsMap.size))))
            let randomCard = remainingCards[randomNum]
            remainingCards.splice(randomNum, 1)
            cards.push(randomCard)
    
            if (cardNum === 4) {
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