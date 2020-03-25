import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import Fab from '@material-ui/core/Fab';

import Stats from '../stats/statsComponent.js';
import Board from '../board/boardComponent.js';
import Card from '../card/cardComponent.js';
import './playScreenComponent.css';

import { connect } from 'react-redux';
import { getCards, hideCards } from '../../actions';

const useStyles = makeStyles(theme => ({
    fab: {
        width: "150px",
        height: "40px"
    }
}))

let PlayScreen = ({ getCards, hideCards, cards }) => {
    const classes = useStyles();

    return (
        <div className="App">
            <header className="Other-players-header">
                <Stats numCoins={3} numBricks={0} numSticks={0} numStones={0} numMud={0} numWolves={0} />
                <Board title={"Sarah's House"} resource={"stick"} firstPlayer={false} />
                <Board title={"Joe's House"} resource={"mud"} firstPlayer={false} />
                <Stats numCoins={3} numBricks={0} numSticks={0} numStones={0} numMud={0} numWolves={0} />
            </header>

            { cards ? 
                <div>
                    <div className="cards-wrapper"><Card cardInfo={cards}/></div>
                    <div className="hide-cards-button-wrapper">
                        <Fab 
                            variant="extended" 
                            color="primary"
                            className={classes.fab}
                            onClick={hideCards}>
                                Hide Cards
                        </Fab>
                    </div>
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
                <Stats numCoins={3} numBricks={0} numSticks={0} numStones={0} numMud={0} numWolves={0} />
            </header>
        </div>
    );
}

const mapDispatchToProps = {
    getCards: getCards,
    hideCards: hideCards,
};

PlayScreen = connect(null, mapDispatchToProps)(PlayScreen);

const mapStateToProps = (state) => ({
    cards: state.cards,
})

PlayScreen = connect(mapStateToProps, null)(PlayScreen);

export default PlayScreen;
