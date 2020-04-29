import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import Fab from '@material-ui/core/Fab';

import Stats from '../stats/statsComponent.js';
import Board from '../board/boardComponent.js';
import Cards from '../card/cardsComponent.js';
import './playScreenComponent.css';

import { connect } from 'react-redux';
import { 
    setCards, 
    reRenderStats, 
    updateMarket, 
    marketClick, 
    chooseOpponentToBuyFromClick,
    resetOpponentsToCoinsToAddMap,
    updateStatsFromBackend
} from '../../actions';

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
    setSelectedCardOnBackend,
    updateOpponentsStatsOnBackend,
    resourceSlashCards,
    updateMarket,
    marketClick,
    isValidResourceToBuyMapCalculated,
    chooseOpponentToBuyFrom,
    chooseOpponentToBuyFromClick,
    resourceToBuy,
    opponentsToCoinsToAddMap,
    marketUpdateOpponentsStats,
    resetOpponentsToCoinsToAddMap,
    updateStatsFromBackend
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

    if (state.enableRevealCardsButton && isValidResourceToBuyMapCalculated) {
        updateMarket();
    }

    if (state.enableRevealCardsButton && opponentsToCoinsToAddMap != null && opponentsToCoinsToAddMap.size > 0) {
        marketUpdateOpponentsStats(opponentsToCoinsToAddMap);
        resetOpponentsToCoinsToAddMap();
        console.log(state)
    }

    console.log(state.updatedStats)
    console.log(stats)
    if (state.updatedStats != null && state.updatedStats["Coin"] !== stats["Coin"]) {
        updateStatsFromBackend(state.updatedStats)
    }

    return (
        <div className="App">
            <header className="Other-players-header">
                <Stats 
                    numCoins={state.opponentsStats.get(secondaryBoardResource) ?
                        state.opponentsStats.get(secondaryBoardResource)["Coin"] : 3} 
                    numBricks={state.opponentsStats.get(secondaryBoardResource) ?
                        state.opponentsStats.get(secondaryBoardResource)["Brick"] : 
                            secondaryBoardResource === "Brick" ? 1 : 0
                        }
                    numSticks={state.opponentsStats.get(secondaryBoardResource) ?
                        state.opponentsStats.get(secondaryBoardResource)["Stick"] : 
                            secondaryBoardResource === "Stick" ? 1 : 0
                        } 
                    numStones={state.opponentsStats.get(secondaryBoardResource) ?
                        state.opponentsStats.get(secondaryBoardResource)["Stone"] : 0} 
                    numMud={state.opponentsStats.get(secondaryBoardResource) ?
                        state.opponentsStats.get(secondaryBoardResource)["Mud"] : 
                            secondaryBoardResource === "Mud" ? 1 : 0
                        } 
                    numWolves={state.opponentsStats.get(secondaryBoardResource) ?
                        state.opponentsStats.get(secondaryBoardResource)["Wolf"] : 0} 
                    numPots={state.opponentsStats.get(secondaryBoardResource) ?
                        state.opponentsStats.get(secondaryBoardResource)["Pot"] : 0} 
                    numSpoons={state.opponentsStats.get(secondaryBoardResource) ?
                        state.opponentsStats.get(secondaryBoardResource)["Spoon"] : 0} 
                    numVps={state.opponentsStats.get(secondaryBoardResource) ?
                        state.opponentsStats.get(secondaryBoardResource)["Victory"] : 0}
                    numApples={state.opponentsStats.get(secondaryBoardResource) ?
                        state.opponentsStats.get(secondaryBoardResource)["Apple"] : 0}
                    numWater={state.opponentsStats.get(secondaryBoardResource) ?
                        state.opponentsStats.get(secondaryBoardResource)["Water"] : 0}
                    numGlasses={state.opponentsStats.get(secondaryBoardResource) ?
                        state.opponentsStats.get(secondaryBoardResource)["Glass"] : 0}
                    numFlowers={state.opponentsStats.get(secondaryBoardResource) ?
                        state.opponentsStats.get(secondaryBoardResource)["Flower"] : 0}
                />
                <Board 
                    title={secondaryBoardTitle} 
                    resource={secondaryBoardResource} 
                    firstPlayer={false} 
                    chooseOpponentToBuyFrom={chooseOpponentToBuyFrom}
                    chooseOpponentToBuyFromClick={() => {
                        chooseOpponentToBuyFromClick(resourceToBuy, secondaryBoardResource)
                        state.client.enableRevealCardsButtonOrNot()
                    }}
                />
                <Board 
                    title={tertiaryBoardTitle} 
                    resource={tertiaryBoardResource} 
                    firstPlayer={false} 
                    chooseOpponentToBuyFrom={chooseOpponentToBuyFrom}
                    chooseOpponentToBuyFromClick={() => {
                        chooseOpponentToBuyFromClick(resourceToBuy, tertiaryBoardResource)
                        state.client.enableRevealCardsButtonOrNot()
                    }}
                />
                <Stats 
                    numCoins={state.opponentsStats.get(tertiaryBoardResource) ?
                        state.opponentsStats.get(tertiaryBoardResource)["Coin"] : 3} 
                    numBricks={state.opponentsStats.get(tertiaryBoardResource) ?
                        state.opponentsStats.get(tertiaryBoardResource)["Brick"] : 
                            tertiaryBoardResource === "Brick" ? 1 : 0
                        } 
                    numSticks={state.opponentsStats.get(tertiaryBoardResource) ?
                        state.opponentsStats.get(tertiaryBoardResource)["Stick"] : 
                            tertiaryBoardResource === "Stick" ? 1 : 0
                        } 
                    numStones={state.opponentsStats.get(tertiaryBoardResource) ?
                        state.opponentsStats.get(tertiaryBoardResource)["Stone"] : 0} 
                    numMud={state.opponentsStats.get(tertiaryBoardResource) ?
                        state.opponentsStats.get(tertiaryBoardResource)["Mud"] : 
                            tertiaryBoardResource === "Mud" ? 1 : 0
                        } 
                    numWolves={state.opponentsStats.get(tertiaryBoardResource) ?
                        state.opponentsStats.get(tertiaryBoardResource)["Wolf"] : 0} 
                    numPots={state.opponentsStats.get(tertiaryBoardResource) ?
                        state.opponentsStats.get(tertiaryBoardResource)["Pot"] : 0} 
                    numSpoons={state.opponentsStats.get(tertiaryBoardResource) ?
                        state.opponentsStats.get(tertiaryBoardResource)["Spoon"] : 0} 
                    numVps={state.opponentsStats.get(tertiaryBoardResource) ?
                        state.opponentsStats.get(tertiaryBoardResource)["Victory"] : 0}
                    numApples={state.opponentsStats.get(tertiaryBoardResource) ?
                        state.opponentsStats.get(tertiaryBoardResource)["Apple"] : 0}
                    numWater={state.opponentsStats.get(tertiaryBoardResource) ?
                        state.opponentsStats.get(tertiaryBoardResource)["Water"] : 0}
                    numGlasses={state.opponentsStats.get(tertiaryBoardResource) ?
                        state.opponentsStats.get(tertiaryBoardResource)["Glass"] : 0}
                    numFlowers={state.opponentsStats.get(tertiaryBoardResource) ?
                        state.opponentsStats.get(tertiaryBoardResource)["Flower"] : 0}
                />
            </header>

            { !loading && cards ? 
                <Cards 
                    state={state}
                    cards={cards} 
                    updateStats={() => reRenderStats()} 
                    updateOpponentsStatsOnBackend={updateOpponentsStatsOnBackend}
                    setSelectedCardOnBackend={setSelectedCardOnBackend} 
                    enableRevealCardsButton={state.enableRevealCardsButton}
                    chooseOpponentToBuyFrom={chooseOpponentToBuyFrom} /> 
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
                <Board 
                    title={primaryBoardTitle} 
                    resource={primaryBoardResource} 
                    firstPlayer={true} 
                    height={state.height}
                    width={state.width}
                    resourceSlashCards={resourceSlashCards}
                    updateStats={() => reRenderStats()}
                    updateOpponentsStatsOnBackend={updateOpponentsStatsOnBackend}
                    secondaryOpponentsStats={state.opponentsStats.get(secondaryBoardResource)}
                    tertiaryOpponentsStats={state.opponentsStats.get(tertiaryBoardResource)}
                    marketClick={(resource) => marketClick(
                        resource, 
                        secondaryBoardResource,
                        state.opponentsStats.get(secondaryBoardResource),
                        tertiaryBoardResource,
                        state.opponentsStats.get(tertiaryBoardResource),
                        updateOpponentsStatsOnBackend
                    )}
                    chooseOpponentToBuyFrom={chooseOpponentToBuyFrom}
                />
                <Stats 
                    numCoins={stats ? stats["Coin"] : 3} 
                    numBricks={stats ? stats["Brick"] : 
                        primaryBoardResource === "Brick" ? 1 : 0
                    } 
                    numSticks={stats ? stats["Stick"] : 
                        primaryBoardResource === "Stick" ? 1 : 0
                    } 
                    numStones={stats ? stats["Stone"] : 0} 
                    numMud={stats ? stats["Mud"] : 
                        primaryBoardResource === "Mud" ? 1 : 0
                    } 
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
    updateMarket: updateMarket,
    marketClick: marketClick,
    chooseOpponentToBuyFromClick: chooseOpponentToBuyFromClick,
    resetOpponentsToCoinsToAddMap: resetOpponentsToCoinsToAddMap,
    updateStatsFromBackend: updateStatsFromBackend
};

PlayScreen = connect(null, mapDispatchToProps)(PlayScreen);

const mapStateToProps = (state) => ({
    cards: state.cards,
    loading: state.loading,
    stats: state.stats,
    statsReRendered: state.statsReRendered,
    resourceSlashCards: state.resourceSlashCards,
    isValidResourceToBuyMapCalculated: state.isValidResourceToBuyMapCalculated,
    chooseOpponentToBuyFrom: state.chooseOpponentToBuyFrom,
    opponentsToCoinsToAddMap: state.opponentsToCoinsToAddMap,
    resourceToBuy: state.resourceToBuy
})

PlayScreen = connect(mapStateToProps, null)(PlayScreen);

export default PlayScreen;
