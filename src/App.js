import React from 'react';

import PlayScreen from './components/playScreen/playScreenComponent.js';

import socket from './socket.js';

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
      board: null,
      cards: null,
      opponentsStats: new Map(),
      enableViewCardsButton: false,
      enableRevealCardsButton: false,
      width: 0,
      height: 0
    }

    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    this.getRandomBoard = this.getRandomBoard.bind(this)
    this.getRandomCards = this.getRandomCards.bind(this)
    this.initializeStats = this.initializeStats.bind(this)
    this.setSelectedCard = this.setSelectedCard.bind(this)
    this.updateOpponentsStats = this.updateOpponentsStats.bind(this)

    this.getRandomBoard()
    this.getRandomCards()
    this.initializeStats()
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

  getRandomBoard() {
    this.state.client.getRandomBoard((error, board) => {
      if (error) return console.error(error);
      this.setState({ board })
      this.state.client.registerEnableViewCardsButtonHandler()
    });
  }

  getRandomCards() {
    this.state.client.getRandomCards((error, cards) => {
      if (error) return console.error(error);
      this.setState({ cards })
    })
  }

  initializeStats() {
    this.state.client.initializeStats()
  }

  setSelectedCard(selectedCard, selectOrDiscard) {
    this.setState({ enableRevealCardsButton: false })
    this.state.client.registerEnableRevealCardsButtonHandler()
    this.state.client.setSelectedCard(selectedCard, selectOrDiscard)
  }

  updateOpponentsStats(updatedStats) {
    this.state.client.updateOpponentsStats(this.state.board, updatedStats)
  }

  updateOpponentsStatsUI(board, updatedStats) {
    let stats = this.state.opponentsStats
    stats.set(board, updatedStats)
    this.setState({ opponentsStats: stats })
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

  render() {
    if (this.state.board != null && this.state.cards != null) {
      return <PlayScreen 
        state={this.state} 
        setSelectedCardOnBackend={this.setSelectedCard}
        updateOpponentsStatsOnBackend={this.updateOpponentsStats} />
    } else {
      return null
    }
  }
}
