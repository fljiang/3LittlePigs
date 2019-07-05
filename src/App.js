import React from 'react';
import './App.css';

import Stats from './components/stats/statsComponent.js';
import Board from './components/board/boardComponent.js';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Stats numCoins={3} numBricks={0} numSticks={0} numStones={0} numMud={0} numWolves={0} />
        <Board />
      </header>
    </div>
  );
}

export default App;
