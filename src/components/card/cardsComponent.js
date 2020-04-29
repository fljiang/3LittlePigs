import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import Fab from '@material-ui/core/Fab';

import Card from './cardComponent.js';
import './cardComponent.css';

import { connect } from 'react-redux';
import { pass, chooseCard, showCardsToDiscard, discardCard, setUpdatedCards } from '../../actions';

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
    state,
    cards,
    pass,
    chooseCard,
    cardChosen,
    showCardToDiscardButton,
    showCardsToDiscard,
    discardCard,
    updateStats,
    setSelectedCardOnBackend,
    enableRevealCardsButton,
    updateOpponentsStatsOnBackend,
    setUpdatedCards,
    chooseOpponentToBuyFrom
}) => {
    const classes = useStyles();

    if (showCardToDiscardButton == null) {
        if (!cardChosen) {
            return (
                <div className="cards-wrapper">
                    { cards.length >= 1 ? 
                        <Card cardInfo={cards[0]} cardIndex={0} 
                            cardClick={() => {
                                const card = cards[0]
                                chooseCard(
                                    card, 
                                    0, 
                                    setSelectedCardOnBackend, 
                                    chooseOpponentToBuyFrom,
                                    updateOpponentsStatsOnBackend
                                )
                                updateStats()
                            }} />
                        : null }
                    { cards.length >= 2 ? 
                        <Card cardInfo={cards[1]} cardIndex={1} 
                            cardClick={() => {
                                const card = cards[1];
                                chooseCard(
                                    card, 
                                    1, 
                                    setSelectedCardOnBackend, 
                                    chooseOpponentToBuyFrom,
                                    updateOpponentsStatsOnBackend
                                )
                                updateStats()
                            }} />
                        : null }
                    { cards.length >= 3 ? 
                        <Card cardInfo={cards[2]} cardIndex={2} 
                            cardClick={() => {
                                const card = cards[2]
                                chooseCard(
                                    card, 
                                    2, 
                                    setSelectedCardOnBackend, 
                                    chooseOpponentToBuyFrom,
                                    updateOpponentsStatsOnBackend
                                )
                                updateStats()
                            }} />
                        : null }
                    { cards.length >= 4 ? 
                        <Card cardInfo={cards[3]} cardIndex={3} 
                            cardClick={() => {
                                const card = cards[3]
                                chooseCard(
                                    card, 
                                    3, 
                                    setSelectedCardOnBackend, 
                                    chooseOpponentToBuyFrom,
                                    updateOpponentsStatsOnBackend
                                )
                                updateStats()
                            }} />
                        : null }
                    { cards.length >= 5 ? 
                        <Card cardInfo={cards[4]} cardIndex={4} 
                            cardClick={() => {
                                const card = cards[4]
                                chooseCard(
                                    card, 
                                    4, 
                                    setSelectedCardOnBackend, 
                                    chooseOpponentToBuyFrom,
                                    updateOpponentsStatsOnBackend
                                )
                                updateStats()
                            }} />
                        : null }
                    { cards.length >= 6 ? 
                        <Card cardInfo={cards[5]} cardIndex={5}
                            cardClick={() => {
                                const card = cards[5]
                                chooseCard(
                                    card, 
                                    5, 
                                    setSelectedCardOnBackend, 
                                    chooseOpponentToBuyFrom,
                                    updateOpponentsStatsOnBackend
                                )
                                updateStats()
                            }} />
                        : null }
                    { cards.length >= 7 ? 
                        <Card cardInfo={cards[6]} cardIndex={6} 
                            cardClick={() => {
                                const card = cards[6]
                                chooseCard(
                                    card, 
                                    6, 
                                    setSelectedCardOnBackend, 
                                    chooseOpponentToBuyFrom,
                                    updateOpponentsStatsOnBackend
                                )
                                updateStats()
                            }} />
                        : null }
                    <Fab 
                        variant="extended" 
                        color="primary"
                        onClick={() => {
                            pass(updateOpponentsStatsOnBackend)
                            updateStats()
                        }}
                        className={classes.fab}>
                            Pass
                    </Fab>
                </div>
            );
        } else {
            if (cards.length === 1) {
                return (
                    <div className="reveal-cards-button-wrapper">
                        <Fab 
                            variant="extended" 
                            color="primary"
                            disabled={ enableRevealCardsButton ? false : true }
                            className={classes.longFab}>
                                Start Round 2
                        </Fab>
                    </div>
                )
            } else {
                return (
                    <div className="reveal-cards-button-wrapper">
                        <Fab 
                            variant="extended" 
                            color="primary"
                            disabled={ enableRevealCardsButton ? false : true }
                            onClick={() => setUpdatedCards(state.cards)}
                            className={classes.longFab}>
                                Reveal Cards
                        </Fab>
                    </div>
                )
            }
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
                    { cards.length >= 1 ? 
                        <Card cardInfo={cards[0]} cardIndex={0} hideTooltip={true}
                            cardClick={() => {
                                const card = cards[0];
                                discardCard(0)
                                setSelectedCardOnBackend(card, "pass", chooseOpponentToBuyFrom)
                            }} />
                        : null }
                    { cards.length >= 2 ? 
                        <Card cardInfo={cards[1]} cardIndex={1} hideTooltip={true}
                            cardClick={() => {
                                const card = cards[1];
                                discardCard(1)
                                setSelectedCardOnBackend(card, "pass", chooseOpponentToBuyFrom)
                            }} />
                        : null }
                    { cards.length >= 3 ? 
                        <Card cardInfo={cards[2]} cardIndex={2} hideTooltip={true}
                            cardClick={() => {
                                const card = cards[2];
                                discardCard(2)
                                setSelectedCardOnBackend(card, "pass", chooseOpponentToBuyFrom)
                            }} />
                        : null }
                    { cards.length >= 4 ? 
                        <Card cardInfo={cards[3]} cardIndex={3} hideTooltip={true}
                            cardClick={() => {
                                const card = cards[3];
                                discardCard(3)
                                setSelectedCardOnBackend(card, "pass", chooseOpponentToBuyFrom)
                            }} />
                        : null }
                    { cards.length >= 5 ? 
                        <Card cardInfo={cards[4]} cardIndex={4} hideTooltip={true}
                            cardClick={() => {
                                const card = cards[4];
                                discardCard(4)
                                setSelectedCardOnBackend(card, "pass", chooseOpponentToBuyFrom)
                            }} />
                        : null }
                    { cards.length >= 6 ? 
                        <Card cardInfo={cards[5]} cardIndex={5} hideTooltip={true}
                            cardClick={() => {
                                const card = cards[5];
                                discardCard(4)
                                setSelectedCardOnBackend(card, "pass", chooseOpponentToBuyFrom)
                            }} />
                        : null }
                    { cards.length >= 7 ? 
                        <Card cardInfo={cards[6]} cardIndex={6} hideTooltip={true}
                            cardClick={() => {
                                const card = cards[6];
                                discardCard(4)
                                setSelectedCardOnBackend(card, "pass", chooseOpponentToBuyFrom)
                            }} />
                        : null }
                </div>
            )
        }
    }
}

const mapDispatchToProps = {
    pass,
    chooseCard,
    showCardsToDiscard,
    discardCard,
    setUpdatedCards
};

Cards = connect(null, mapDispatchToProps)(Cards);

const mapStateToProps = (state) => ({
    cardChosen: state.cardChosen,
    showCardToDiscardButton: state.showCardToDiscardButton,
})

Cards = connect(mapStateToProps, null)(Cards);

export default Cards;