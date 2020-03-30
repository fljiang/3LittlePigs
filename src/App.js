import React from 'react';

import PlayScreen from './components/playScreen/playScreenComponent.js';

import socket from './socket.js';

export default class App extends React.Component {
  constructor(props, context) {
    super(props, context)

    this.state = {
      client: socket(),
      board: null
    }

    this.getRandomBoard = this.getRandomBoard.bind(this)

    this.getRandomBoard()
  }

  getRandomBoard() {
    this.state.client.getRandomBoard((error, board) => {
      if (error) return console.error(error);
      this.setState({ board })
    });
  }

  render() {
    if (this.state.board != null) {
      return <PlayScreen state={this.state} />
    } else {
      return null
    }
  }
}
