import React from 'react';

import PlayScreen from './components/playScreen/playScreenComponent.js';

import socket from './socket.js';
import CreateOrJoinGame from './components/createOrJoinGame/createOrJoinGameComponent.js';

export default class App extends React.Component {
    constructor(props, context) {
        super(props, context)

        this.state = {
            client: socket(
                (board, updatedStats) => this.updateOpponentsStatsUI(board, updatedStats),
                () => this.setEnableViewCardsButton(),
                () => this.setEnableRevealCardsButton(),
                (updatedCards) => this.updateCards(updatedCards)
            ),
            gameCode: null,
            board: null,
            cards: null,
            updatedStats: null,
            opponentsStats: new Map(),
            isValidResourcesToBuy: null,
            enableViewCardsButton: false,
            enableRevealCardsButton: false,
            width: 0,
            height: 0,
        }

        this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
        this.startGame = this.startGame.bind(this)
        this.joinGame = this.joinGame.bind(this)
        this.launchGameBoard = this.launchGameBoard.bind(this)
        this.setSelectedCard = this.setSelectedCard.bind(this)
        this.updateOpponentsStats = this.updateOpponentsStats.bind(this)
        this.marketUpdateOpponentsStats = this.marketUpdateOpponentsStats.bind(this)
        this.updateStatsFromBackendFinished = this.updateStatsFromBackendFinished.bind(this)
    }

    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
    }
    
    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }
    
    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    }

    startGame() {
        this.state.client.startGame((error, gameCode) => {
            if (error) return console.error(error);
            this.setState({ gameCode })
        })
    }

    joinGame(gameCode) {
        this.state.client.joinGame((error, gameCode) => {
            if (error) return console.error(error);

            this.setState({ gameCode: gameCode })
            this.launchGameBoard()
        }, gameCode)
    }

    launchGameBoard() {
        this.state.client.getRandomBoard((error, board) => {
            if (error) return console.error(error);
            this.setState({ board })
            this.state.client.registerEnableViewCardsButtonHandler()
            this.state.client.initializeStats(this.state.gameCode)
        });

        this.state.client.getRandomCards((error, cards) => {
            if (error) return console.error(error);
            this.setState({ cards })
        })
    }

    setSelectedCard(selectedCard, selectOrDiscard, opponentsToChooseFrom) {
        this.setState({ enableRevealCardsButton: false })
        this.state.client.registerEnableRevealCardsButtonHandler()
        this.state.client.setSelectedCard(selectedCard, selectOrDiscard, opponentsToChooseFrom)
    }

    updateOpponentsStats(updatedStats) {
        this.state.client.updateOpponentsStats(this.state.board, updatedStats)
    }

    updateOpponentsStatsUI(board, updatedStats) {
        if (board === this.state.board) {
            this.setState({ updatedStats })
        } else {
            let stats = this.state.opponentsStats
            stats.set(board, updatedStats)
            this.setState({ opponentsStats: stats })
        }
    }

    marketUpdateOpponentsStats(opponentsToCoinsToAddMap) {
        let opponentsStats = this.state.opponentsStats
        let client = this.state.client
        opponentsToCoinsToAddMap.forEach(function (value, key) {
            let updatedStats = opponentsStats.get(key)
            updatedStats["Coin"] += value
            client.updateOpponentsStats(key, updatedStats)
        })
    }

    setEnableRevealCardsButton() {
        this.setState({ enableRevealCardsButton: true })
        this.state.client.unregisterEnableRevealCardsButtonHandler()
    }

    setEnableViewCardsButton() {
        this.setState({ enableViewCardsButton: true })
        this.state.client.unregisterEnableViewCardsButtonHandler()
    }

    updateCards(updatedCards) {
        this.setState({ cards: updatedCards })
    }

    updateStatsFromBackendFinished() {
        this.setState({ updatedStats: null })
    }

    render() {
        if (this.state.board != null && this.state.cards != null) {
            return <PlayScreen 
                state={this.state} 
                setSelectedCardOnBackend={this.setSelectedCard}
                updateOpponentsStatsOnBackend={this.updateOpponentsStats}
                marketUpdateOpponentsStats={this.marketUpdateOpponentsStats}
                updateStatsFromBackendFinished={this.updateStatsFromBackendFinished} />
        } else {
            return (
                <CreateOrJoinGame 
                    width={this.state.width} 
                    height={this.state.height}
                    gameCode={this.state.gameCode}
                    startGame={this.startGame}
                    joinGame={this.joinGame}
                    launchGameBoard={this.launchGameBoard}
                />
            );
        }
    }
}
