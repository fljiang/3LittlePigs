import React from 'react';

import PlayScreen from './components/playScreen/playScreenComponent.js';

import socket from './socket.js';

export default class App extends React.Component {
  constructor(props, context) {
    super(props, context)

    this.state = {
      client: socket(),
      board: null,
      cards: null
    }

    this.getRandomBoard = this.getRandomBoard.bind(this)
    this.getRandomCards = this.getRandomCards.bind(this)

    this.getRandomBoard()
    this.getRandomCards()
  }

  getRandomBoard() {
    this.state.client.getRandomBoard((error, board) => {
      if (error) return console.error(error);
      this.setState({ board })
    });
  }

  getRandomCards() {
    this.state.client.getRandomCards((error, cards) => {
      if (error) return console.error(error);
      this.setState({ cards })
    })
  }

  render() {
    if (this.state.board != null && this.state.cards != null) {
      return <PlayScreen state={this.state} />
    } else {
      return null
    }
  }
}
