import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import Fab from '@material-ui/core/Fab';

import Stats from '../stats/statsComponent.js';
import Board from '../board/boardComponent.js';
import Card from '../card/cardComponent.js';
import './playScreenComponent.css';

import { connect } from 'react-redux';
import { getCards } from '../../actions';

const useStyles = makeStyles(theme => ({
    fab: {
        width: "150px",
        height: "40px"
    }
}))

let PlayScreen = ({ 
    loading, 
    getCards, 
    cards 
}) => {
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
                <Board title={"Sarah's House"} resource={"stick"} firstPlayer={false} />
                <Board title={"Joe's House"} resource={"mud"} firstPlayer={false} />
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
                <div className="cards-wrapper">
                    <Card cardInfo={cards[0]} cardIndex={0} />
                    <Card cardInfo={cards[1]} cardIndex={1} />
                    <Card cardInfo={cards[2]} cardIndex={2} />
                    <Card cardInfo={cards[3]} cardIndex={3} />
                    <Card cardInfo={cards[4]} cardIndex={4} />
                    <Card cardInfo={cards[5]} cardIndex={5} />
                    <Card cardInfo={cards[6]} cardIndex={6} />
                </div> :
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
                <Board title={"Billy's House"} resource={"brick"} firstPlayer={true} />
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
};

PlayScreen = connect(null, mapDispatchToProps)(PlayScreen);

const mapStateToProps = (state) => ({
    cards: state.cards,
    loading: state.loading,
})

PlayScreen = connect(mapStateToProps, null)(PlayScreen);

export default PlayScreen;
