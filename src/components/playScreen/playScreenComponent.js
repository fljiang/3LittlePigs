import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import Fab from '@material-ui/core/Fab';

import Stats from '../stats/statsComponent.js';
import Board from '../board/boardComponent.js';
import Cards from '../card/cardsComponent.js';
import './playScreenComponent.css';

import { connect } from 'react-redux';
import { setCards, reRenderStats } from '../../actions';

const useStyles = makeStyles(theme => ({
    fab: {
        width: "150px",
        height: "40px"
    }
}))

let PlayScreen = ({ 
    state,
    loading, 
    setCards, 
    cards,
    reRenderStats,
    stats,
    setSelectedCardOnBackend
}) => {
    const classes = useStyles();

    let primaryBoardTitle;
    let secondaryBoardTitle;
    let tertiaryBoardTitle;
    let secondaryBoardResource;
    let tertiaryBoardResource;

    const primaryBoardResource = state.board;
    if (state.board === "Stick") {
        primaryBoardTitle = "Sarah's House";
        secondaryBoardTitle = "Joe's House";
        tertiaryBoardTitle = "Billy's House";
        secondaryBoardResource = "Mud";
        tertiaryBoardResource = "Brick";
    } else if (state.board === "Brick") {
        primaryBoardTitle = "Billy's House";
        secondaryBoardTitle = "Sarah's House";
        tertiaryBoardTitle = "Joe's House";
        secondaryBoardResource = "Stick";
        tertiaryBoardResource = "Mud";
    } else {
        primaryBoardTitle = "Joe's House";
        secondaryBoardTitle = "Billy's House";
        tertiaryBoardTitle = "Sarah's House";
        secondaryBoardResource = "Brick";
        tertiaryBoardResource = "Stick";
    }

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
                <Cards 
                    cards={cards} 
                    updateStats={() => reRenderStats()} 
                    setSelectedCardOnBackend={setSelectedCardOnBackend} 
                    enableRevealCardsButton={state.enableRevealCardsButton} /> 
                :
                <div className="view-cards-button-wrapper">
                    <Fab 
                        variant="extended" 
                        color="primary"
                        className={classes.fab}
                        disabled={ state.enableViewCardsButton ? false : true }
                        onClick={() => setCards(state.board, state.cards)}>
                            View Cards
                    </Fab>
                </div>
            }

            <header className="First-player-header">
                <Board title={primaryBoardTitle} resource={primaryBoardResource} firstPlayer={true} />
                <Stats 
                    numCoins={stats ? stats["Coin"] : 3} 
                    numBricks={stats ? stats["Brick"] : 0} 
                    numSticks={stats ? stats["Stick"] : 0} 
                    numStones={stats ? stats["Stone"] : 0} 
                    numMud={stats ? stats["Mud"] : 0} 
                    numWolves={stats ? stats["Wolf"] : 0}
                    numPots={stats ? stats["Pot"] : 0}
                    numSpoons={stats ? stats["Spoon"] : 0}
                    numVps={stats ? stats["Victory"] : 0}
                    numApples={stats ? stats["Apple"] : 0}
                    numWater={stats ? stats["Water"] : 0}
                    numGlasses={stats ? stats["Glass"] : 0}
                    numFlowers={stats ? stats["Flower"] : 0}
                />
            </header>
        </div>
    );
}

const mapDispatchToProps = {
    setCards: setCards,
    reRenderStats: reRenderStats,
};

PlayScreen = connect(null, mapDispatchToProps)(PlayScreen);

const mapStateToProps = (state) => ({
    cards: state.cards,
    loading: state.loading,
    stats: state.stats,
    statsReRendered: state.statsReRendered,
})

PlayScreen = connect(mapStateToProps, null)(PlayScreen);

export default PlayScreen;
