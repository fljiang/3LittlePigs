import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import Fab from '@material-ui/core/Fab';

import Card from './cardComponent.js';
import './cardComponent.css';

import { connect } from 'react-redux';
import { pass, chooseCard, showCardsToDiscard, discardCard } from '../../actions';

const useStyles = makeStyles(theme => ({
    fab: {
        width: "80px",
        height: "80px",
        borderRadius: "50%",
        marginLeft: "5px",
        backgroundColor: "#111E6C"
    },
    longFab: {
        width: "300px",
        height: "40px"
    }
}))

let Cards = ({
    cards,
    pass,
    chooseCard,
    cardChosen,
    showCardToDiscardButton,
    showCardsToDiscard,
    discardCard,
    updateStats
}) => {
    const classes = useStyles();

    if (showCardToDiscardButton == null) {
        if (!cardChosen) {
            return (
                <div className="cards-wrapper">
                    <Card cardInfo={cards[0]} cardIndex={0} 
                        cardClick={() => {
                            chooseCard(cards[0], 0)
                            updateStats()
                        }} />
                    <Card cardInfo={cards[1]} cardIndex={1} 
                        cardClick={() => {
                            chooseCard(cards[1], 1)
                            updateStats()
                        }} />
                    <Card cardInfo={cards[2]} cardIndex={2} 
                        cardClick={() => {
                            chooseCard(cards[2], 2)
                            updateStats()
                        }} />
                    <Card cardInfo={cards[3]} cardIndex={3} 
                        cardClick={() => {
                            chooseCard(cards[3], 3)
                            updateStats()
                        }} />
                    <Card cardInfo={cards[4]} cardIndex={4} 
                        cardClick={() => {
                            chooseCard(cards[4], 4)
                            updateStats()
                        }} />
                    {/* <Card cardInfo={cards[5]} cardIndex={5} />
                    <Card cardInfo={cards[6]} cardIndex={6} /> */}
                    <Fab 
                        variant="extended" 
                        color="primary"
                        onClick={() => {
                            pass()
                            updateStats()
                        }}
                        className={classes.fab}>
                            Pass
                    </Fab>
                </div>
            );
        } else {
            return (
                <div className="reveal-cards-button-wrapper">
                    <Fab 
                        variant="extended" 
                        color="primary"
                        className={classes.longFab}>
                            Reveal Opponents' Cards
                    </Fab>
                </div>
            )
        }
    } else {
        if (showCardToDiscardButton) {
            return (
                <div className="reveal-cards-button-wrapper">
                    <Fab 
                        variant="extended" 
                        color="primary"
                        onClick={() => showCardsToDiscard()}
                        className={classes.longFab}>
                            Choose Card to Discard
                    </Fab>
                </div>
            )
        } else {
            return (
                <div className="cards-wrapper">
                    <Card cardInfo={cards[0]} cardIndex={0} hideTooltip={true}
                        cardClick={() => discardCard(0)} />
                    <Card cardInfo={cards[1]} cardIndex={1} hideTooltip={true}
                        cardClick={() => discardCard(1)} />
                    <Card cardInfo={cards[2]} cardIndex={2} hideTooltip={true}
                        cardClick={() => discardCard(2)} />
                    <Card cardInfo={cards[3]} cardIndex={3} hideTooltip={true}
                        cardClick={() => discardCard(3)} />
                    <Card cardInfo={cards[4]} cardIndex={4} hideTooltip={true}
                        cardClick={() => discardCard(4)} />
                    {/* <Card cardInfo={cards[5]} cardIndex={5} />
                    <Card cardInfo={cards[6]} cardIndex={6} /> */}
                </div>
            )
        }
    }
}

const mapDispatchToProps = {
    pass: pass,
    chooseCard: chooseCard,
    showCardsToDiscard,
    discardCard,
};

Cards = connect(null, mapDispatchToProps)(Cards);

const mapStateToProps = (state) => ({
    cardChosen: state.cardChosen,
    showCardToDiscardButton: state.showCardToDiscardButton,
})

Cards = connect(mapStateToProps, null)(Cards);

export default Cards;