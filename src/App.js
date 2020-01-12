import React from 'react';
import Fab from '@material-ui/core/Fab';
import { makeStyles } from "@material-ui/core/styles";
import './App.css';

import Stats from './components/stats/statsComponent.js';
import Board from './components/board/boardComponent.js';

const useStyles = makeStyles(theme => ({
  fab: {
    width: "150px",
    height: "40px"
  }
}))

function App() {
  const classes = useStyles();

  return (
    <div className="App">
      <header className="Other-players-header">
        <Stats numCoins={3} numBricks={0} numSticks={0} numStones={0} numMud={0} numWolves={0} />
        <Board title={"Sarah's House"} resource={"stick"} firstPlayer={false} />
        <Board title={"Joe's House"} resource={"mud"} firstPlayer={false} />
        <Stats numCoins={3} numBricks={0} numSticks={0} numStones={0} numMud={0} numWolves={0} />
      </header>

      <div className="view-cards-button-wrapper">
        <Fab variant="extended" color="primary" className={classes.fab}>View Cards</Fab>
      </div>

      <header className="First-player-header">
        <Board title={"Billy's House"} resource={"brick"} firstPlayer={true} />
        <Stats numCoins={3} numBricks={0} numSticks={0} numStones={0} numMud={0} numWolves={0} />
      </header>
    </div>
  );
}

export default App;
