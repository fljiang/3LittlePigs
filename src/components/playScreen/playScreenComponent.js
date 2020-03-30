import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import Fab from '@material-ui/core/Fab';

import Stats from '../stats/statsComponent.js';
import Board from '../board/boardComponent.js';
import Cards from '../card/cardsComponent.js';
import './playScreenComponent.css';

import { connect } from 'react-redux';
import { getCards, setBoard, startGame } from '../../actions';

import socket from './../../socket';

const useStyles = makeStyles(theme => ({
    fab: {
        width: "150px",
        height: "40px"
    }
}))

let PlayScreen = ({ 
    loading, 
    getCards, 
    cards,
    setBoard,
    board,
    startGame,
    client
}) => {
    startGame(socket());
    client.getRandomBoard((error, randomBoard) => {
        if (error) return console.error(error);
        setBoard(randomBoard);
    });

    let primaryBoardTitle;
    let secondaryBoardTitle;
    let tertiaryBoardTitle;
    let secondaryBoardResource;
    let tertiaryBoardResource;
    if (board === "stick") {
        primaryBoardTitle = "Sarah's House";
        secondaryBoardTitle = "Joe's House";
        tertiaryBoardTitle = "Billy's House";
        secondaryBoardResource = "mud";
        tertiaryBoardResource = "brick";
    } else if (board === "brick") {
        primaryBoardTitle = "Billy's House";
        secondaryBoardTitle = "Sarah's House";
        tertiaryBoardTitle = "Joe's House";
        secondaryBoardResource = "stick";
        tertiaryBoardResource = "mud";
    } else {
        primaryBoardTitle = "Joe's House";
        secondaryBoardTitle = "Billy's House";
        tertiaryBoardTitle = "Sarah's House";
        secondaryBoardResource = "brick";
        tertiaryBoardResource = "stick";
    }

    const classes = useStyles();
    return (
        <div className="App">
            <header className="Other-players-header">
                <Stats 
                    numCoins={3} 
                    numBricks={0} 
                    numSticks={0} 
                    numStones={0} 
                    numMud={0} 
                    numWolves={0} 
                    numPots={0} 
                    numSpoons={0} 
                    numVps={0}
                    numApples={0}
                    numWater={0}
                    numGlasses={0}
                    numFlowers={0}
                />
                <Board title={secondaryBoardTitle} resource={secondaryBoardResource} firstPlayer={false} />
                <Board title={tertiaryBoardTitle} resource={tertiaryBoardResource} firstPlayer={false} />
                <Stats 
                    numCoins={3} 
                    numBricks={0} 
                    numSticks={0} 
                    numStones={0} 
                    numMud={0} 
                    numWolves={0} 
                    numPots={0} 
                    numSpoons={0} 
                    numVps={0}
                    numApples={0}
                    numWater={0}
                    numGlasses={0}
                    numFlowers={0}
                />
            </header>

            { !loading && cards ? 
                <Cards cards={cards} /> :
                <div className="view-cards-button-wrapper">
                    <Fab 
                        variant="extended" 
                        color="primary"
                        className={classes.fab}
                        onClick={getCards}>
                            View Cards
                    </Fab>
                </div>
            }

            <header className="First-player-header">
                <Board title={primaryBoardTitle} resource={board} firstPlayer={true} />
                <Stats 
                    numCoins={3} 
                    numBricks={0} 
                    numSticks={0} 
                    numStones={0} 
                    numMud={0} 
                    numWolves={0}
                    numPots={0}
                    numSpoons={0}
                    numVps={0}
                    numApples={0}
                    numWater={0}
                    numGlasses={0}
                    numFlowers={0}
                />
            </header>
        </div>
    );
}

const mapDispatchToProps = {
    getCards: getCards,
    setBoard: setBoard,
    startGame: startGame,
};

PlayScreen = connect(null, mapDispatchToProps)(PlayScreen);

const mapStateToProps = (state) => ({
    cards: state.cards,
    loading: state.loading,
    board: state.board,
    client: state.client,
})

PlayScreen = connect(mapStateToProps, null)(PlayScreen);

export default PlayScreen;
